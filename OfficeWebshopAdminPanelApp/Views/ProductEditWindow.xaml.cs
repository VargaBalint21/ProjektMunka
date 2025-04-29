using OfficeWebshopAdminPanelApp.Models;
using OfficeWebshopAdminPanelApp.ViewModels;
using System.Windows;

namespace OfficeWebshopAdminPanelApp.Views
{
    /// <summary>
    /// Interaction logic for ProductEditWindow.xaml
    /// </summary>
    public partial class ProductEditWindow : Window
    {
        public ProductEditWindow(ProductModel product)
        {
            InitializeComponent();
            var productEditViewModel = new ProductEditViewModel(product);
            this.DataContext = productEditViewModel;
        }
    }
}
