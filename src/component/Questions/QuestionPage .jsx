import { useEffect, useState } from 'react';
import { getQuestions, submitAnswers } from '../../api/api';
import ResultPage from '../../component/Result/ResultPage';
import Api from '../../service/axios';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 min = 300 sec

    // Fetch questions
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getQuestions();
                setQuestions(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return handleSubmit();
        const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const handleAnswer = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const answerList = Object.entries(answers).map(([qId, selected]) => ({
            questionId: qId,
            selected,
        }));

        try {
            const res = await submitAnswers(answerList, feedback);
            console.log('res  : ', res);

            setScore(res.score);
            setSubmitted(true);
        } catch (err) {
            console.error(err);
        }
    };

    if (submitted) {
        return (
            <ResultPage
                score={score}
                testId={'784962'}
                onSubmitFeedback={(feedbackData) => {
                    console.log('Submit to backend:', feedbackData);
                    // optional: call API to save feedback
                }}
            />
        );
    }

    const currentQuestion = questions[current];

    return (
        <>
            <h1 className='text-blue-900 text-center font-bold text-3xl'>Assess your Intelligence</h1>
            <div className="flex p-6 min-h-screen mx-auto bg-gray-100">
                {/* Left Sidebar - Question palette */}
                <div className="w-1/4 pr-4 bg-gray-200 p-4 rounded">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {questions.map((q, i) => {
                            const isAnswered = answers[q._id];
                            return (
                                <button
                                    key={q._id}
                                    onClick={() => setCurrent(i)}
                                    className={`w-8 h-8 rounded-full text-sm font-medium
                  ${isAnswered ? 'bg-green-400 text-white' : current === i ? 'border-2 border-blue-500' : 'bg-gray-300'}
                `}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-green-400 rounded-full"></div>Attended</div>
                        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-gray-300 rounded-full"></div>Yet to Attend</div>
                    </div>
                </div>

                {/* Right content */}
                <div className="w-3/4 pl-4">
                    <div className="flex justify-between mb-4 items-center">
                        <span className="font-bold text-lg text-gray-700">Question {current + 1} / {questions.length}</span>
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded text-sm">🕒 {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                    </div>

                    {currentQuestion && (
                        <div className="bg-white p-6 rounded shadow mb-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">{currentQuestion.questionText}</h2>
                            {currentQuestion.options.map(opt => (
                                <label key={opt} className="block mb-2 cursor-pointer text-gray-700">
                                    <input
                                        type="radio"
                                        name={currentQuestion._id}
                                        value={opt}
                                        checked={answers[currentQuestion._id] === opt}
                                        onChange={() => handleAnswer(currentQuestion._id, opt)}
                                        className="mr-2"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between">
                        <div>

                        </div>
                        <div>
                            <button
                                onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
                                disabled={current === 0}
                                className=" px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700"
                            >
                                Previous
                            </button>
                            {current < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrent(prev => Math.min(questions.length - 1, prev + 1))}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionPage;