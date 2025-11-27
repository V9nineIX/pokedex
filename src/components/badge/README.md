# Badge Component

A flexible and reusable Badge component for displaying labels, tags, and Pokemon types with customizable styles.

## Features

- Multiple size options (sm, md, lg)
- Multiple color variants
- Special Pokemon type color scheme
- Fully customizable with className
- TypeScript support

## Usage

### Basic Usage

```tsx
import Badge from './components/badge';

// Default badge
<Badge>Default</Badge>

// With variant
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
```

### Size Variants

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Color Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

### Pokemon Type Badges

The Badge component uses the project's `TYPE_COLORS` constant for authentic Pokemon type styling:

```tsx
<Badge variant="type" type="fire">Fire</Badge>
<Badge variant="type" type="water">Water</Badge>
<Badge variant="type" type="grass">Grass</Badge>
<Badge variant="type" type="electric">Electric</Badge>
<Badge variant="type" type="psychic">Psychic</Badge>
// ... and all other Pokemon types
```

The colors are automatically pulled from `src/app/constant/index.ts`, ensuring consistency across your app.

### Custom Styling

You can add custom classes using the `className` prop:

```tsx
<Badge className="uppercase tracking-wide">Custom</Badge>
```

## Props

| Prop        | Type                                                                                    | Default     | Description                                    |
| ----------- | --------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `children`  | `React.ReactNode`                                                                       | -           | Badge content (required)                       |
| `variant`   | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'type'` | `'default'` | Badge color variant                            |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                                  | `'md'`      | Badge size                                     |
| `type`      | `string`                                                                                | -           | Pokemon type name (used with `variant="type"`) |
| `className` | `string`                                                                                | `''`        | Additional CSS classes                         |

## Supported Pokemon Types

- Normal, Fire, Water, Electric, Grass, Ice
- Fighting, Poison, Ground, Flying, Psychic
- Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

## Example in PokemonCard

```tsx
import Badge from "../badge";

{
  pokemon.types.map((type: string) => (
    <Badge key={type} variant="type" type={type} size="sm">
      {type}
    </Badge>
  ));
}
```
