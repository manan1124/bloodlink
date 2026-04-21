# BloodLink 🩸

BloodLink is a JavaScript-based platform designed to connect blood donors, recipients, quickly and efficiently.

## 🚀 Features

- Donor registration and profile management
- Recipient/blood request creation
- Blood group based search and matching
- Location-based donor discovery
- Request status tracking
- Contact and notification workflow
- Clean and responsive UI

## 🛠️ Tech Stack

- **Language:** JavaScript
- **Frontend:** (Add framework if used: React / Vue / etc.)
- **Backend:** (Add runtime/framework if used: Node.js / Express / etc.)
- **Database:** (Add DB if used: MongoDB / MySQL / etc.)
- **Other Tools:** (Add any APIs/services)

## 📂 Project Structure

```bash
bloodlink/
├── src/                # Application source code
├── public/             # Static files
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template (if applicable)
└── README.md
```

> Update this structure according to your actual repository folders.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manan1124/bloodlink.git
   cd bloodlink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (if needed):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

## 🧪 Available Scripts

- `npm start` – Run the app
- `npm run dev` – Run in development mode
- `npm run build` – Build for production
- `npm test` – Run tests

> Keep only scripts that exist in your `package.json`.

## 🌐 Usage

1. Register as a donor or login as a user.
2. Search donors by blood group and location.
3. Create a blood request in emergencies.
4. Connect with matched donors/blood banks.
5. Track request updates.

## 🔐 Environment Variables

If your app uses environment variables, add them here:

```env
PORT=3000
DB_URI=your_database_uri
JWT_SECRET=your_jwt_secret
API_BASE_URL=your_api_url
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request
