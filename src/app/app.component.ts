import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'furdy-fire';
  isUpdating = false;
  isUserDataLoading = true;
  userData!: Observable<any>;

  isPasswordChanging = false;
  currentUserId?: string;
  currentPass?: string;
  passwordChangeMessage: string | null = null;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => console.log('Data Saved Successfully'))
      .catch(console.error);
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    this.isUserDataLoading = true;
  
    collectionData(collectionInstance, { idField: 'id' }).subscribe({
      next: () => {
        this.isUserDataLoading = false;
      },
      complete: () => {},
      error: (err) => {
        console.error(err);
        this.isUserDataLoading = false;
      }
    });
  
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  async updateData(id: string, field: string, newValue: string, currentPassword?: string) {
    this.isUpdating = true;
    const userDocRef = doc(this.firestore, 'users', id);
    const updateData: any = { [field]: newValue };

    try {
      if (field === 'password' && currentPassword !== this.currentPass) {
        this.passwordChangeMessage = 'Current password does not match';
      } else {
        await updateDoc(userDocRef, updateData);
        if (field === 'password') {
          this.passwordChangeMessage = 'Password Updated';
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isUpdating = false;
    }
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance)
      .then(() => console.log('Data Deleted'))
      .catch(console.error);
  }


  showPassword(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }

  togglePasswordChanging(selectedValue: string, userId: string, currentPass: string) {
    if (selectedValue === 'password') {
      this.isPasswordChanging = true;
      this.currentUserId = userId;
      this.currentPass = currentPass;
    }
  }

  closePasswordPopup() {
    this.isPasswordChanging = false;
  }
}
