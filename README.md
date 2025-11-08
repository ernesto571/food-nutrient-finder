# 🥗 NutriScan  

**NutriScan** is a lightweight React application that lets users search for foods and instantly view their nutritional information.  
Powered by the **[OpenFoodFacts API](https://world.openfoodfacts.org/)**, it provides a fast and intuitive way to explore nutrient data for thousands of products — from *apple* to *Coca-Cola*.  

---

## 🚀 Features  

- 🔍 **Search by Keyword**  
  Users can search for food items like *coke*, *apple*, or *chicken sandwich*. Results are fetched in real-time from the OpenFoodFacts API.  

- 🧾 **Food Details Page**  
  Clicking a result displays full nutrition details such as calories, fat, sugar, carbohydrates, and proteins.  

- 🧠 **Nutrient Breakdown**  
  Data is structured in an easy-to-read layout that highlights key nutrients and serving size information.  

- ⚡ **Fast & Lightweight**  
  Built with React and vanilla CSS for quick load times and smooth navigation.  

- 📱 **Responsive UI**  
  Mobile-friendly design ensures a seamless experience across all devices.  

---

## 🧰 Tech Stack  

### Frontend  
- React (Vite)  
- Axios  
- React Router  
- CSS3  

### API  
- [OpenFoodFacts API](https://world.openfoodfacts.org/data)  

---

## ⚡️ Getting Started  

### Prerequisites  
- Node.js (v18+)  

---

### 🔧 Installation  

#### 1. Clone the repository  
```bash
git clone https://github.com/ernesto571/food-nutrient-finder.git
cd nutriscan
```

#### 2. Install dependencies  
```bash
npm install
```

---

### ▶️ Run the App  

```bash
npm run dev
```

Then open your browser at **http://localhost:5173**  

---

## 🌍 Deployment  

You can deploy the app easily to **Vercel**, **Netlify**, or any static hosting service.  
Make sure the OpenFoodFacts API endpoint remains accessible via HTTPS in your build.  

---

## 🧠 Project Structure  

```bash
food-nutrient-finder/
│
├── src/
│   ├── components/
│   │   ├── FoodCard.jsx
│   ├── css/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── SearchResult.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── index.css
│
└── vite.config.js
```

---

## 🧩 API Example  

**Search for a product:**  
```bash
GET https://world.openfoodfacts.org/cgi/search.pl?search_terms=apple&json=true
```

**Fetch a product by barcode or ID:**  
```bash
GET https://world.openfoodfacts.org/api/v2/product/{product_id}.json
```

---

## 💡 Future Enhancements  

- Add user login to save favorite foods  
- Display nutrient comparison charts  
- Implement calorie tracking and meal planning  
- Include barcode scanning (mobile support)  

---

## 🧑‍💻 Author  

**Emmanuel Cruz**  
Frontend Developer  
[GitHub](https://github.com/ernesto571) | [LinkedIn](https://linkedin.com/in/yourprofile)
