import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

const planningInputFields = [
  {
    label: 'Title',
    type: 'text',
    key: 'title',
    required: true,
  },
  {
    label: 'Planning Date',
    type: 'date',
    key: 'planningDate',
    required: true,
  },
  {
    label: 'Planning Notes',
    type: 'textarea',
    key: 'planningNotes',
    required: false,
  },
  {
    label: 'Option Name',
    type: 'text',
    key: 'optionName',
    required: true,
  },
  {
    label: 'ingredients',
    type: 'textarea',
    key: 'ingredients',
    required: true,
  },
  {
    label: 'Notes',
    type: 'textarea',
    key: 'notes',
    required: false,
  },
  {
    label: 'Start Time',
    type: 'time',
    key: 'startTime',
    required: false,
  },
  {
    label: 'End Time',
    type: 'time',
    key: 'endTime',
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
      taskPlanningInputList: planningInputFields,
    });

    console.log('taskPlanningInputList successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

// Call the function to save the data
// saveProfessionTaskPlanning();
