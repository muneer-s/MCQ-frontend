import { useEffect, useState } from 'react';
import { getQuestions, submitAnswers } from '../../api/api';
import ResultPage from '../../component/Result/ResultPage';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300);

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

    // timer logic
    useEffect(() => {
        if (timeLeft <= 0) return handleSubmit();
        const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const handleAnswer = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleSubmit = async () => {
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
                }}
            />
        );
    }

    const currentQuestion = questions[current];

    return (
        <>
            <h1 className='text-sky-900 text-center font-bold text-3xl'>Assess your&nbsp;
                <span className="relative inline-block">
                    <span className="relative z-10"> Intelligence</span>
                    <span className="absolute left-0 bottom-1 w-full h-2 bg-orange-300 z-0"></span>
                </span>
            </h1>


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
                                    className={`w-10 h-8 border text-sm font-medium border-black
    ${isAnswered
                                            ? 'bg-green-100 text-black'
                                            : current === i
                                                ? 'bg-gray-600 text-white'
                                                : 'bg-gray-300'
                                        }
  `}
                                >
                                    {i + 1}
                                </button>

                            );
                        })}
                    </div>
                    <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-green-400 rounded-full"></div>Attended</div>
                        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-gray-600 rounded-full"></div>Not Attended</div>
                        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-gray-300 rounded-full"></div>Yet to Attend</div>
                    </div>
                </div>

                {/* Right content */}
                <div className="w-3/4 pl-4">
                    <div className="flex justify-between mb-4 items-center">
                        <div className="flex items-center w-3/4">
                            <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
                                <div
                                    className="h-full bg-sky-900"
                                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                            <span className="ml-2 font-semibold text-black whitespace-nowrap">
                                {current + 1}/{questions.length}
                            </span>
                        </div>

                        {/* Timer badge */}
                        <span className="ml-4  bg-yellow-400 text-black px-3 py-1 text-sm rounded">
                            🕒 {Math.floor(timeLeft / 60)} Min
                        </span>
                    </div>

                    {currentQuestion && (
                        <div className="bg-white p-6 rounded shadow mb-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">{currentQuestion.questionText}</h2>

                            {currentQuestion.options.map(opt => {
                                const isSelected = answers[currentQuestion._id] === opt;
                                return (
                                    <label
                                        key={opt}
                                        className={`flex items-center mb-3 px-4 py-2 border rounded cursor-pointer transition
        ${isSelected ? 'bg-green-100 border-green-500 text-green-800' : 'bg-gray-100 hover:bg-gray-200'}
      `}
                                    >
                                        <input
                                            type="radio"
                                            name={currentQuestion._id}
                                            value={opt}
                                            checked={isSelected}
                                            onChange={() => handleAnswer(currentQuestion._id, opt)}
                                            className="form-radio text-green-600 focus:ring-0 mr-3"
                                        />
                                        <span className="text-base">{opt}</span>
                                    </label>
                                );
                            })}


                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between">
                        <div>

                        </div>
                        <div className='flex'>
                            <button
                                onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
                                disabled={current === 0}
                                className={`mr-3 px-5 py-2 flex items-center gap-2 rounded text-white font-medium 
                ${current === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#255A6B] hover:bg-[#1e4b58]'}`}
                            >
                                <span className="text-xl">←</span> Previous
                            </button>

                            {current < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrent(prev => Math.min(questions.length - 1, prev + 1))}
                                    className="px-5 py-2 flex items-center gap-2 bg-[#255A6B] hover:bg-[#1e4b58] rounded text-white font-medium"
                                >
                                    Next <span className="text-xl">→</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium"
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