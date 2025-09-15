import React, { useState } from "react";
import image from "../src/assets/div.png";
import { v4 as uuidv4 } from "uuid";

export default function BeautyAdvisor() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(uuidv4());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const beautyProductopenSourceImages = [
    "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg",
    "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg",
    "https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg",
    "https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg",
    "https://images.pexels.com/photos/1830450/pexels-photo-1830450.jpeg",
    "https://images.pexels.com/photos/29229051/pexels-photo-29229051.jpeg",
    "https://images.pexels.com/photos/13599787/pexels-photo-13599787.jpeg",
    "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg",
    "https://images.pexels.com/photos/16667091/pexels-photo-16667091.jpeg",
    "https://images.pexels.com/photos/16667089/pexels-photo-16667089.jpeg",
    "https://images.pexels.com/photos/7797453/pexels-photo-7797453.jpeg"
];


  // Start a new chat with a new session ID
  const handleNewChat = () => {
  const newSession = uuidv4();
  setSessionId(newSession);
  setMessages([]);
  setData({}); // Clear product recommendations and images
  };

  // Send message to API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // ✅ Production API
      // const res = await fetch("https://c9e4968c-9d97-4a60-9d16-cc12dda8e50b-00-30wlxyrayxne2.pike.replit.dev/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ session_id: sessionId, message: input })
      // });

      // 🔄 Local API (uncomment when running your own backend)
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: input })
      });
    

      const responseData = await res.json();
      console.log("Response data:", responseData);

      setData(responseData); // <-- update data state

      const botMessage = { sender: "bot", text: responseData.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { sender: "bot", text: "Oops! Something went wrong. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
      console.error(err);
    }

    setInput("");
    setLoading(false);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff5f8", display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#fff",
        borderRight: "1px solid #eee",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h3 style={{ color: "#d63384" }}>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
          {["🏠 Dashboard", "💬 Chat", "🛒 Products", "⚙️ Settings"].map((item, i) => (
            <li 
              key={i}
              style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer", color: "#000" }}
              onMouseOver={e => e.currentTarget.style.color = "#d63384"}
              onMouseOut={e => e.currentTarget.style.color = "#000"}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #d63384",
            background: "#fff",
            color: "#d63384",
            cursor: "pointer"
          }}
          onClick={handleNewChat}
        >
          ➕ New Chat
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #eee", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#d63384" }}>💄 Beauty Advisor</h3>
          <div>
            <button style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: "20px", cursor: "pointer" }}>Profile</button>
          </div>
        </header>

        {/* Welcome + Image Upload */}
        <div style={{ background: "#ffe6f1", padding: "24px", textAlign: "center", margin: "24px 32px", borderRadius: "12px" }}>
          <div style={{ marginBottom: "20px" }}>
            <img src={image} alt="placeholder" style={{ borderRadius: "12px", maxWidth: "50px", width: "50%", height: "50px" }} />
          </div>
          <h2 style={{ color: "#d63384", marginBottom: "12px" }}>Welcome to Your Personal Beauty Advisor</h2>
          <p style={{ color: "#444" }}>I’m here to help you discover the perfect skincare routine tailored just for you. Let’s start with a quick conversation about your skin to find your ideal products.</p>
        </div>

        {/* Chat Section */}
        <div style={{ padding: "0 32px", marginBottom: "32px", flex: 1, overflowY: "auto" }}>
          {/* Add default BOT MESSAGE */}
          {
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
              <div style={{ maxWidth: "70%", padding: "12px 16px", borderRadius: "16px", background: "#f1f3f5", color: "#333", fontStyle: "italic" }}>
                👋 Hi! I'm your Beauty Advisor. Ask me anything about skincare, routines, or products and I'll help you find the best options for your needs!
              </div>
            </div>
          }
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", marginBottom: "12px" }}>
              <div style={{ maxWidth: "70%", padding: "12px 16px", borderRadius: "16px", background: msg.sender === "user" ? "#d63384" : "#f1f3f5", color: msg.sender === "user" ? "#fff" : "#333" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: "#d63384", fontStyle: "italic" }}>Bot is typing...</div>}
        </div>

        {/* display cards with product recommendations */}
        <div style={{ display: "flex", gap: "16px", padding: "16px 32px", marginBottom: "90px" }}>
            {data.products && Array.isArray(data.products) && data.products.map((product, i) => {

              // Pick a random image for each product
              const randomImg = beautyProductopenSourceImages[Math.floor(Math.random() * beautyProductopenSourceImages.length)];
              const imgSrc = product.img_link ? product.img_link : randomImg;
              return (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", flex: "1 1 200px" }}>
                  <img src={imgSrc} alt="product" style={{ width: "100%", height: "50%", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
                  <h4 style={{ margin: "0 0 8px", color: "#d63384" }}>{product.name}</h4>
                  {product.brand && <p style={{ margin: 0, color: "#555" }}><strong>Brand:</strong> {product.brand}</p>}
                  {product.price && <p style={{ margin: 0, color: "#555" }}><strong>Price:</strong> ${product.price}</p>}
                  {product.description && <i style={{ margin: 0, color: "#555", fontSize: "0.95em" }}><strong>Description:</strong> {product.description}</i>}
                </div>
              );
            })}
        </div>

        {/* Routine Section */}
        <>
        {!data.products && 
          <div style={{ background: "#f8f0fc", padding: "24px", borderRadius: "12px", margin: "0 32px 90px" }}>
          <h3 style={{ margin: "0 0 12px", color: "#af3270ff" }}>✨ Your Personalized Skincare Routine</h3>
          {<p style={{ margin: 0, color: "#555" }}>Carefully curated for your skin type and concerns.</p>}
        </div>}
        </>


        {/* Input Box - Fixed at bottom */}
        <div style={{ borderTop: "1px solid #ddd", padding: "16px 32px", display: "flex", gap: "8px", background: "#fff", position: "fixed", bottom: 0, left: "220px", right: 0 }}>
          <input
            type="text"
            placeholder="Ask me about ingredients, routines, or skincare questions..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1, padding: "12px", borderRadius: "20px", border: "1px solid #ccc" }}
          />
          <button
            onClick={sendMessage}
            style={{ padding: "12px 16px", borderRadius: "50%", border: "none", background: "#d63384", color: "#fff", cursor: "pointer" }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
