import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

// The updated taskPlanningInputList
const taskPlanningInputList = [
  {
    label: 'Name',
    type: 'text',
    key: 'name',
    required: true,
  },
  {
    label: 'Email',
    type: 'email',
    key: 'email',
    required: true,
  },
  {
    label: 'Phone',
    type: 'number',
    key: 'phone',
    required: true,
  },
  {
    label: 'Card Number',
    type: 'number',
    key: 'cardNumber',
    required: true,
  },
  {
    label: 'Months',
    type: 'number',
    key: 'months',
    required: false,
  },
  {
    label: 'Years',
    type: 'number',
    key: 'years',
    required: false,
  },
  {
    label: 'Facebook URL',
    type: 'url',
    key: 'facebookUrl',
    required: false,
  },
  {
    label: 'Instagram URL',
    type: 'url',
    key: 'instagram',
    required: false,
  },
  {
    label: 'Website',
    type: 'url',
    key: 'website',
    required: false,
  },
  {
    label: 'Marketing Budget',
    type: 'text',
    key: 'marketingBudget',
    required: false,
  },
];

// Function to set the document in Firestore

export const updateProfessionTaskPlanning = async () => {
  try {
    // Create a reference to the specific document in the "profession" collection
    const professionDocRef = doc(db, 'professions', 'OMbbTlgf0eaorHOBuSVH');

    // Update only the taskPlanningInputList field in the document
    await updateDoc(professionDocRef, {
      taskPlanningInputList: taskPlanningInputList,
    });

    console.log('taskPlanningInputList successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

// Call the function to save the data
// saveProfessionTaskPlanning();
