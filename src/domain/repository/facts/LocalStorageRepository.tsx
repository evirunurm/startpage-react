
// This is a repository that stores user data to Local Storage
export default interface LocalStorageRepository {
  
  getImage(): void;
  saveImage(): void;

  getColors(): void;
  saveColors(): void;
}