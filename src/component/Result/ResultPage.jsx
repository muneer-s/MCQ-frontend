import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { submitFeedback } from '../../api/api';
import Swal from 'sweetalert2';


const emojis = [
  { label: "Very Bad", value: 1, emoji: "😠" },
  { label: "Bad", value: 2, emoji: "😞" },
  { label: "Okay", value: 3, emoji: "😐" },
  { label: "Good", value: 4, emoji: "😊" },
  { label: "Excellent", value: 5, emoji: "😍" }
];

const ResultPage = ({ score, testId, onSubmitFeedback }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleFeedbackSubmit = async () => {
    if (!selectedEmoji) {
      return Swal.fire({
        icon: 'warning',
        title: 'No Emoji Selected',
        text: 'Please select an emoji for feedback!',
        confirmButtonColor: '#6366F1'
      });
    }

    try {
      await submitFeedback(testId, selectedEmoji, comment);

      Swal.fire({
        icon: 'success',
        title: 'Feedback submitted successfully!',
        text: 'Welcome',
        confirmButtonColor: '#234B5E',
      }).then(() => {
        setSelectedEmoji(null);
        setComment('');
        navigate('/startingPage');

      });
    } catch (error) {
      alert(error.message || "An error occurred while submitting feedback.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center mt-20 px-4">
      <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Congratulations you have Successfully Completed The Test</h2>

      <div className="flex justify-center items-center gap-2 mt-4 mb-6">
        <span className="text-lg font-medium">Score :</span>
        <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">{score}/50</span>
      </div>

      <div className="mb-6">
        <span className="bg-sky-800 text-white px-6 py-2 rounded-md font-semibold text-lg">Your ID : {testId}</span>
      </div>

      <div className="bg-white shadow rounded p-6 text-left">
        <h3 className="font-semibold text-lg mb-1">Feedback</h3>
        <p className="text-sm mb-4 text-gray-600">Give us a feedback! Your input is important for us. We take customer feedback very seriously.</p>

        <div className="flex justify-start items-center mb-4">
          {emojis.map(({ emoji, value }) => (
            <button
              key={value}
              onClick={() => setSelectedEmoji(value)}
              className={`text-3xl transition-transform hover:scale-125 ${selectedEmoji === value ? 'scale-125 border-2 border-blue-500 rounded-full p-1' : ''
                }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          rows={4}
        />

        <button
          onClick={handleFeedbackSubmit}
          className="bg-sky-800 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
        >
          Submit Feedback
        </button>
      </div>

      <div className="mt-6 flex justify-center items-ceneter mb-10">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-600 hover:underline flex items-center justify-center gap-2"
        >
          <span>🏠</span> Back to home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
