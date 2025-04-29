using OfficeWebshopAdminPanelApp.Services;
using OfficeWebshopAdminPanelApp.Views;
using System.Windows;

namespace OfficeWebshopAdminPanelApp
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
        }

        protected override void OnStartup(StartupEventArgs e)
        {
            var loginWindow = new LoginWindow();
            loginWindow.ShowDialog();
        }

    }


}
