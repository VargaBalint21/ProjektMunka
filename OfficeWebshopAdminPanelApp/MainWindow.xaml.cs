using OfficeWebshopAdminPanelApp.Models;
using OfficeWebshopAdminPanelApp.ViewModels;
using OfficeWebshopAdminPanelApp.Views;
using System.Windows;
using System.Windows.Controls;

namespace OfficeWebshopAdminPanelApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var productViewModel = new ProductViewModel();
            this.DataContext = productViewModel;

            productViewModel.LoadProductsAsync();
        }

        private void OnAddNewProductClick(object sender, RoutedEventArgs e)
        {
            // ProductAddWindow megnyitása
            var productAddWindow = new ProductAddWindow();
            var productAddViewModel = new ProductAddViewModel();
            productAddWindow.DataContext = productAddViewModel;
            productAddWindow.Show();
        }


        private void OnProductDoubleClick(object sender, RoutedEventArgs e)
        {
            if (sender is ListViewItem item && item.DataContext is ProductModel product)
            {
                var productViewModel = (ProductViewModel)this.DataContext;
                productViewModel.SelectProductCommand.Execute(product);
            }
        }

    }
}
