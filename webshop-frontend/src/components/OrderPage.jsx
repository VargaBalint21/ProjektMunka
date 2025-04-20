import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function OrderPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCartItems } = useOutletContext(); 

  const [useExisting, setUseExisting] = useState(true);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Magyarország"
  });

  const [cartItems, setLocalCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  const [cardData, setCardData] = useState({
    card_name: "",
    card_number: "",
    expiry: "",
    cvc: ""
  });

  const countries = [
    'Magyarország', 'Ausztria', 'Belgium', 'Bulgária', 'Ciprus', 
    'Csehország', 'Dánia', 'Észtország', 'Finnország', 'Franciaország', 
    'Görögország', 'Horvátország', 'Hollandia', 'Írország', 'Lengyelország', 
    'Lettország', 'Litvánia', 'Luxemburg', 'Málta', 'Németország', 
    'Olaszország', 'Portugália', 'Románia', 'Spanyolország', 'Svédország', 
    'Szlovákia', 'Szlovénia', 'Egyesült Királyság'
  ];

  useEffect(() => {
    if (!token) return;

    // Felhasználói adatok
    axios.get("http://localhost:8000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const user = res.data;
        setUserData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phone: user.phone || ""
        });
      });

    // Kosár
    axios.get("http://localhost:8000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLocalCartItems(res.data))
      .catch(() => setLocalCartItems([]));

    // Cím
    if (useExisting) {
      axios.get("http://localhost:8000/api/profile/address", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.data) {
            setAddress(res.data);
          }
        })
        .catch(() => {
          alert("Nem sikerült betölteni a címet.");
          setUseExisting(false);
        });
    } else {
      setAddress({
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Magyarország"
      });
    }
  }, [useExisting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["first_name", "last_name", "email", "phone"].includes(name)) {
      setUserData(prev => ({ ...prev, [name]: value }));
    } else if (["card_name", "card_number", "expiry", "cvc"].includes(name)) {
      setCardData(prev => ({ ...prev, [name]: value }));
    } else {
      setAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone: userData.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      payment_method: paymentMethod,
      ...(paymentMethod === "credit_card" ? {
        card_name: cardData.card_name,
        card_number: cardData.card_number,
        expiry: cardData.expiry,
        cvc: cardData.cvc
      } : {})
    };

    try {
      await axios.post("http://localhost:8000/api/order", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Megrendelés sikeres!");

      
      setUserData({ first_name: "", last_name: "", email: "", phone: "" });
      setAddress({ street: "", city: "", state: "", postal_code: "", country: "" });
      setCardData({ card_name: "", card_number: "", expiry: "", cvc: "" });
      setLocalCartItems([]);
      setCartItems([]); 
      navigate("/");
    } catch (err) {
      alert("Hiba a megrendelés elküldésekor.");
      console.error(err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return (
    <div className="container mt-5">
      <h2>Megrendelés leadása</h2>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="useExisting"
          checked={useExisting}
          onChange={() => setUseExisting(!useExisting)}
        />
        <label className="form-check-label" htmlFor="useExisting">
          {useExisting ? "Meglévő cím és adatok használata" : "Új adatok megadása"}
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <h5>Felhasználói adatok</h5>
        <div className="mb-3">
          <label>Vezetéknév</label>
          <input type="text" name="last_name" className="form-control" value={userData.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Keresztnév</label>
          <input type="text" name="first_name" className="form-control" value={userData.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Telefonszám</label>
          <input type="text" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
        </div>

        <h5 className="mt-4">Szállítási cím</h5>
        <div className="mb-3">
          <label>Utca</label>
          <input type="text" name="street" className="form-control" value={address.street} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Város</label>
          <input type="text" name="city" className="form-control" value={address.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Megye / Állam</label>
          <input type="text" name="state" className="form-control" value={address.state} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Irányítószám</label>
          <input type="text" name="postal_code" className="form-control" value={address.postal_code} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Ország</label>
          <select 
            name="country" 
            className="form-select" 
            value={address.country} 
            onChange={handleChange} 
            required
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <h5 className="mt-4">Fizetési mód</h5>
        <div className="mb-3">
          <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cod">Utánvétel</option>
            <option value="credit_card">Bankkártya</option>
          </select>
        </div>

        {paymentMethod === "credit_card" && (
          <div className="border p-3 rounded mb-4">
            <h6>Kártyaadatok</h6>
            <div className="mb-3">
              <label>Kártyatulajdonos neve</label>
              <input type="text" name="card_name" className="form-control" value={cardData.card_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Kártyaszám</label>
              <input type="text" name="card_number" className="form-control" value={cardData.card_number} onChange={handleChange} required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Lejárat</label>
                <input type="text" name="expiry" className="form-control" placeholder="MM/YY" value={cardData.expiry} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>CVC</label>
                <input type="text" name="cvc" className="form-control" value={cardData.cvc} onChange={handleChange} required />
              </div>
            </div>
          </div>
        )}

        <h5 className="mt-4">Rendelés tartalma</h5>
        <ul className="list-group mb-3">
          {cartItems.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              {item.product.name} – {item.quantity} db
              <span>{(item.quantity * item.product.price / 100).toFixed(2)} Ft</span>
            </li>
          ))}
        </ul>

        <h6 className="text-end">Végösszeg: {(total / 100).toFixed(2)} Ft</h6>

        <button type="submit" className="btn btn-primary mt-3">Megrendelés elküldése</button>
      </form>
    </div>
  );
}

export default OrderPage;
