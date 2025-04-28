using OfficeWebshopAdminPanelApp.ViewModels;
using System.Windows;
using System.Windows.Controls;

namespace OfficeWebshopAdminPanelApp.Views
{
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
            DataContext = new LoginViewModel();
        }

        private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
        {
            if (DataContext is LoginViewModel vm)
            {
                vm.Password = ((PasswordBox)sender).Password;
            }
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            await ((LoginViewModel)DataContext).LoginAsync();
        }
    }
}
