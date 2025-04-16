import { useState } from "react";
import Select from "react-select";

const countryOptions = [
  { value: "Ghana", label: "🇬🇭 Ghana" },
  { value: "Nigeria", label: "🇳🇬 Nigeria" },
  { value: "Kenya", label: "🇰🇪 Kenya" },
];

function EventRegistrationForm() {
  const [country, setCountry] = useState(countryOptions[0]);
  const [reminder, setReminder] = useState("A Day to the event");

  return (
    <div className="space-y-4">
      {/* Country Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <Select
          options={countryOptions}
          value={country}
          onChange={setCountry}
          className="mt-1"
        />
      </div>

      {/* Reminder Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Reminder</label>
        <select
          value={reminder}
          onChange={(event) => setReminder(event.target.value)}
          className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-green-500 focus:border-green-500"
        >
          <option>A Day to the event</option>
          <option>A Week to the event</option>
          <option>On the Event Day</option>
        </select>
      </div>

      <p className="text-sm text-gray-600 text-center">
        All your personal details will be stored and shared.
      </p>
    </div>
  );
}

export default EventRegistrationForm;
