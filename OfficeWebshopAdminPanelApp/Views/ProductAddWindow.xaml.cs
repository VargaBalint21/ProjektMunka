using OfficeWebshopAdminPanelApp.ViewModels;
using System.Windows;

namespace OfficeWebshopAdminPanelApp.Views
{
    public partial class ProductAddWindow : Window
    {
        public ProductAddWindow()
        {
            InitializeComponent();

            var productAddViewModel = new ProductAddViewModel();

            this.DataContext = productAddViewModel;
        }
    }
}
