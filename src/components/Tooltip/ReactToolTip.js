import React from 'react';
import ReactTooltip from 'react-tooltip';

const appointmentRequest = {
  id: 1,
  vetId: 2,
  userId: 4,
  petId: 1,
  date: "2022-10-10",
  time: "10:00",
  description: "Check up, the dog has been coughing. I tried to give him some medicine but it doesn't seem to work. At last, I decided to bring him to the vet.",
  status: "pending",
  medium: "offline",
  prescription: {
    doctor: "Dr. Smith",
    next_visit_date: "2022-11-10",
    prescriptionPdf: "https://example.com/prescription1.pdf",
    medicines: [
      { name: "Cough Syrup", dosage: "5 ml twice a day" },
      { name: "Anti-inflammatory", dosage: "1 tablet daily" }
    ],
    tests: ["Chest X-ray", "Blood Test"]
  }
};

const medicinesList = appointmentRequest.prescription.medicines.map((medicine, index) => (
  <li key={index}>{medicine.name} - {medicine.dosage}</li>
));

const testsList = appointmentRequest.prescription.tests.map((test, index) => (
  <li key={index}>{test}</li>
));

const App = () => (
  <div>
    <div data-tip data-for="medicinesTooltip">
      <button className="btn-sm btn">Medicines List</button>
    </div>
    <ReactTooltip id="medicinesTooltip" place="top" effect="solid">
      <ul>{medicinesList}</ul>
    </ReactTooltip>

    <div data-tip data-for="testsTooltip">
      <button className="btn-sm btn">Tests</button>
    </div>
    <ReactTooltip id="testsTooltip" place="top" effect="solid">
      <ul>{testsList}</ul>
    </ReactTooltip>
  </div>
);

export default App;
