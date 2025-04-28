using OfficeWebshopAdminPanelApp.Models;
using System.ComponentModel;
using System.Net.Http;
using System.Windows.Input;
using System.Windows;
using System.Net.Http.Json;
using CommunityToolkit.Mvvm.Input;
using OfficeWebshopAdminPanelApp.Views;

namespace OfficeWebshopAdminPanelApp.ViewModels
{
    public class ProductEditViewModel : INotifyPropertyChanged
    {
        public ProductModel SelectedProduct { get; }

        public ICommand SaveProductCommand { get; }

        public ICommand DeleteProductCommand { get; }

        public ProductEditViewModel(ProductModel product)
        {
            SelectedProduct = product;
            SaveProductCommand = new RelayCommand(SaveProduct);
            DeleteProductCommand = new RelayCommand(DeleteProduct);
        }

        private async void SaveProduct()
        {
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.PutAsJsonAsync($"http://localhost:8000/api/products/{SelectedProduct.Id}", SelectedProduct);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Product updated successfully!");
                }
                else
                {
                    MessageBox.Show("Failed to update the product.");
                }
            }
        }

        private async void DeleteProduct()
        {
            var confirmDelete = MessageBox.Show("Are you sure you want to delete this product?", "Delete Product", MessageBoxButton.YesNo);
            if (confirmDelete == MessageBoxResult.Yes)
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.DeleteAsync($"http://localhost:8000/api/products/{SelectedProduct.Id}");
                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Product deleted successfully!");

                        // ProductEditWindow bezárása
                        var productEditWindow = Application.Current.Windows.OfType<ProductEditWindow>().FirstOrDefault();
                        productEditWindow?.Close();

                        // Window Újratöltése a változtatott termékekkel
                        var mainWindow = Application.Current.Windows.OfType<MainWindow>().FirstOrDefault();
                        if (mainWindow != null)
                        {
                            var productViewModel = (ProductViewModel)mainWindow.DataContext;
                            await productViewModel.ReloadProductsAsync();
                        }
                    }
                    else
                    {
                        MessageBox.Show("Failed to delete the product.");
                    }
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
