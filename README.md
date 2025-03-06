# Product Configurator

A dynamic, interactive web application that allows users to customize a model's outfit by selecting different positions, materials, and colors. Built with Preact and leveraging Preact Signals for efficient state management and persistence.

![Product Configurator Demo](http://localhost:5173/)

![Screenshot of Configurator](/configurator.jpg)

## Features

- **Interactive Product Configuration**: Change positions, materials, and colors with real-time visual updates
- **Persistent Settings**: User selections are saved across page reloads
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Optimized Performance**: Using Preact Signals for efficient state management and minimal re-renders
- **Validation Logic**: Ensures compatible selections between positions, materials, and colors

## Technologies Used

- [Preact](https://preactjs.com/) - A fast 3kB alternative to React with the same API
- [@preact/signals](https://github.com/preactjs/signals) - Fine-grained reactive state management
- LocalStorage API - For persisting user preferences

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/asuh/configurator.git
   cd configurator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Position Selection**: Choose between different product positions/angles
2. **Material Selection**: Select from available materials for the current position
3. **Color Selection**: Pick a color from the available options for the selected material

Your selections are automatically saved and will persist even after refreshing the page or returning later.

## Architecture

### State Management with Preact Signals

This application uses Preact Signals for reactive state management:

```javascript
// Core state signals
const positionId = signal(defaultPosition);
const materialId = signal(defaultMaterial);
const colorId = signal(defaultColor);

// Computed values derived from state
const currentPosition = computed(() => 
  data.Positions.find(p => p.Position === positionId.value)
);

const currentMaterial = computed(() => 
  currentPosition.value.Materials.find(m => m.Id === materialId.value)
);

// Automatic persistence
effect(() => {
  saveState({
    positionId: positionId.value,
    materialId: materialId.value,
    colorId: colorId.value
  });
});
```

### Component Structure

- **App**: Main container component
- **Positions**: Position component
- **Materials**: Material component 
- **Colors**: Color component

### Data Flow

1. User interactions update signal values
2. Computed signals automatically derive new values
3. UI components react to signal changes
4. State is automatically persisted to localStorage

## Configuration

Product data is loaded from a JSON configuration file with the following structure:

```json
{
  "BaseImageUrl": "https://example.com/api/image",
  "Positions": [
    {
      "Position": "position1",
      "ImageUrl": "https://example.com/images/position1.png",
      "Materials": [
        {
          "Id": "material1",
          "Name": "Material 1",
          "Colors": [
            {
              "Id": "color1",
              "Name": "Color 1",
              "SwatchUrl": "https://example.com/swatches/color1.png"
            }
          ]
        }
      ]
    }
  ]
}
```

## Future Updates

1. Accessibility improvements - Ensure all interactive elements are accessible via keyboard navigation to enhance usability for users with disabilities
2. Testing - Verify TypeScript covers all potential unit tests and type safety
3. Performance improvements
    1. Use better image formats
    2. Remove swatches and use CSS
    3. Refactor and break down components further
4. Add loading indicators or spinners