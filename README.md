# Inventory Management System

A modern, responsive inventory management application built with vanilla HTML, CSS, and JavaScript. Features a clean user interface with full CRUD operations and beautiful SweetAlert2 notifications.

## Features

- ✅ **Add Products**: Create new inventory items with name, quantity, and price
- ✅ **Update Products**: Edit existing products with real-time form population
- ✅ **Delete Products**: Remove items with confirmation dialogs
- ✅ **Form Validation**: Client-side validation with helpful error messages
- ✅ **Responsive Design**: Mobile-friendly interface that works on all devices
- ✅ **Toast Notifications**: Beautiful success/error notifications using SweetAlert2
- ✅ **Auto-increment ID**: Automatic product ID generation
- ✅ **Modern UI**: Clean, professional design with hover effects

## Vista previa del proyecto

![Captura del proyecto](https://i.ibb.co/F4nfWGy1/Captura-de-pantalla-2025-06-26-230017.png)


## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Vanilla JavaScript for all functionality
- **SweetAlert2**: Beautiful alerts and notifications

## Project Structure

```
inventory-management/
│
├── index.html          # Main HTML file
├── src/
│   ├── styles/
│   │   └── styles.css  # All styling
│   └── js/
│       └── app.js      # Application logic
└── README.md           # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Luisr26/SPA_GestionM3S2/
   cd inventory-management
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

## Usage

### Adding Products
1. Fill in the product name, quantity, and price fields
2. Click the "Save" button
3. Success notification will appear

### Updating Products
1. Click the "Update" button on any product row
2. Product details will populate the form
3. Modify the information as needed
4. Click "Update" to save changes

### Deleting Products
1. Click the "Delete" button on any product row
2. Confirm deletion in the popup dialog
3. Product will be removed from the inventory

### Form Management
- Use the "Clear" button to reset all form fields
- Form validation prevents submission of invalid data
- Visual feedback shows when in edit mode

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints at 460px for mobile devices
- Flexible table layout that adapts to screen size
- Touch-friendly button sizes

### Validation System
- Required field validation
- Numeric validation for quantity and price
- Positive number validation
- Real-time error feedback

### User Experience
- Smooth animations and transitions
- Hover effects on interactive elements
- Loading states and feedback
- Confirmation dialogs for destructive actions

## Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development

### File Structure
- `index.html`: Main HTML structure
- `src/styles/styles.css`: All CSS styling and responsive design
- `src/js/app.js`: JavaScript logic and functionality

### Key Functions
- `addProduct()`: Creates new inventory items
- `updateProduct()`: Modifies existing products
- `deleteProduct()`: Removes products with confirmation
- `renderTable()`: Updates the display table
- `validateForm()`: Handles form validation
- `showToast()`: Displays notifications

## License

This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [SweetAlert2](https://sweetalert2.github.io/) for beautiful alerts
- Modern CSS techniques for responsive design
- Vanilla JavaScript for lightweight functionality

## Contact

Luis Orozco - luisoro009@gmail.com

Project Link: [projectLink](https://spa-gestion-m3-s2-5e2w.vercel.app/)
