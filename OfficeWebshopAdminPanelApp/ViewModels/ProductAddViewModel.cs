using OfficeWebshopAdminPanelApp.Models;
using System.ComponentModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Windows.Input;
using CommunityToolkit.Mvvm.Input;
using System.Windows;
using OfficeWebshopAdminPanelApp.Views;

namespace OfficeWebshopAdminPanelApp.ViewModels
{
    public class ProductAddViewModel : INotifyPropertyChanged
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Stock { get; set; }

        public ICommand SaveProductCommand { get; }

        public ProductAddViewModel()
        {
            SaveProductCommand = new RelayCommand(SaveProduct);
        }

        private async void SaveProduct()
        {
            var newProduct = new ProductModel
            {
                Name = this.Name,
                Price = this.Price,
                Description = this.Description,
            };

            MessageBox.Show($"Sending: Name={newProduct.Name}, Price={newProduct.Price}, Description={newProduct.Description}");

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.PostAsJsonAsync("http://localhost:8000/api/products", newProduct);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Product added successfully!");

                    // ProductAddWindow bezárása
                    var productAddWindow = Application.Current.Windows.OfType<ProductAddWindow>().FirstOrDefault();
                    productAddWindow?.Close();

                    // // Window Újratöltése az új termékekkel
                    var mainWindow = Application.Current.Windows.OfType<MainWindow>().FirstOrDefault();
                    if (mainWindow != null)
                    {
                        var productViewModel = (ProductViewModel)mainWindow.DataContext;
                        await productViewModel.ReloadProductsAsync();
                    }
                }
                else
                {
                    string errorMessage = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Failed to add the product. Error: {errorMessage}");
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
