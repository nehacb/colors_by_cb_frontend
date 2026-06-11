export interface Product { // export interface is used to define the structure of a product object, 
// which can be used throughout the application to ensure type safety and consistency when working with product data.

// why interface instead of class?
// 1. Interfaces are purely for defining the shape of an object and do not have any implementation details, 
// while classes can have both properties and methods with implementation.
// 2. Interfaces cannot be instantiated, while classes can be instantiated to create objects.
// 3. Interfaces support multiple inheritance, allowing a class to implement multiple interfaces, 
// while classes can only extend one other class.

// why export? 
// 1. The export keyword allows the product interface to be imported and used in other files or
//  modules within the application, promoting code reusability and modularity.
// 2. By exporting the interface, it can be shared across different components, services, 
// or modules that need to work with product data, ensuring consistency in the structure of product objects 
// throughout the application.

  id?: number;

  name: string;

  price: number;

  imageUrl: string;

  artistName: string;

  description: string;

  category: string;

} 