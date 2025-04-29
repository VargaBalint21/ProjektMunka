using System.ComponentModel;

namespace OfficeWebshopAdminPanelApp.Models
{
    public class ProductModel : INotifyPropertyChanged
    {
        private string _name;
        private decimal _price;
        private string _description;

        public int Id { get; set; }
        public string Name
        {
            get => _name;
            set { _name = value; OnPropertyChanged(nameof(Name)); }
        }
        public decimal Price
        {
            get => _price;
            set { _price = value; OnPropertyChanged(nameof(Price)); }
        }
        public string Description
        {
            get => _description;
            set { _description = value; OnPropertyChanged(nameof(Description)); }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
