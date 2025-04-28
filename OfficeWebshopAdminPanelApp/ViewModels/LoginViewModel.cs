using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Windows;
using OfficeWebshopAdminPanelApp.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using OfficeWebshopAdminPanelApp.Services;

namespace OfficeWebshopAdminPanelApp.ViewModels
{
    public partial class LoginViewModel : ObservableObject
    {
        [ObservableProperty] private string email;
        [ObservableProperty] private string password;
        [ObservableProperty] private string errorMessage;

        public async Task LoginAsync()
        {
            var client = new HttpClient();
            var loginData = new
            {
                email = Email,
                password = Password
            };

            var json = JsonConvert.SerializeObject(loginData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await client.PostAsync("http://localhost:8000/api/login", content);
                var responseBody = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<LoginResponse>(responseBody);
                    AuthService.Token = result.Token;

                    MessageBox.Show($"Szia {result.User.FirstName}!", "Sikeres bejelentkezés");

                    // MainWindow megnyitása
                    var mainWindow = new MainWindow();
                    mainWindow.Show();
                    Application.Current.Windows.OfType<LoginWindow>().FirstOrDefault()?.Close();
                }
                else
                {
                    ErrorMessage = JsonConvert.DeserializeObject<ApiError>(responseBody)?.Message ?? "Sikertelen bejelentkezés";
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = $"Hiba: {ex.Message}";
            }
        }
    }

    public class LoginResponse
    {
        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("user")]
        public UserDto User { get; set; }
    }

    public class UserDto
    {
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
    }

    public class ApiError
    {
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
