using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using OfficeWebshopAdminPanelApp.Models;
using OfficeWebshopAdminPanelApp.Views;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Windows;
using System.Windows.Input;

namespace OfficeWebshopAdminPanelApp.ViewModels
{
    public class ProductViewModel : BaseViewModel
    {
        private ObservableCollection<ProductModel> _products;
        public ObservableCollection<ProductModel> Products
        {
            get { return _products; }
            set
            {
                _products = value;
                OnPropertyChanged();
            }
        }
        public ICommand SelectProductCommand { get; }

        private readonly HttpClient _httpClient;

        public ProductViewModel()
        {
            _httpClient = new HttpClient();
            _products = new ObservableCollection<ProductModel>();
            SelectProductCommand = new RelayCommand<ProductModel>(SelectProduct);
        }

        private void SelectProduct(ProductModel product)
        {
            // ProductEditWindow-ra átirányítás
            var productEditWindow = new ProductEditWindow(product);
            productEditWindow.Show();
        }

        public async Task LoadProductsAsync()
        {
            try
            {
                var response = await _httpClient.GetStringAsync("http://127.0.0.1:8000/api/products");
                var products = JsonConvert.DeserializeObject<List<ProductModel>>(response);
                Products.Clear();
                foreach (var product in products)
                {
                    Products.Add(product);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error fetching products: {ex.Message}");
            }
        }

        public async Task ReloadProductsAsync()
        {
            try
            {
                var response = await _httpClient.GetStringAsync("http://127.0.0.1:8000/api/products");
                var products = JsonConvert.DeserializeObject<List<ProductModel>>(response);
                Products.Clear();
                foreach (var product in products)
                {
                    Products.Add(product);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error fetching products: {ex.Message}");
            }
        }
    }

}
