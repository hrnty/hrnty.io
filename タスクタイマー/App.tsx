import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Task, Log } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getAnalysis } from './services/geminiService';
import { PromotionBanner } from './PromotionBanner';

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 14a4 4 0 003.465-2.002.5.5 0 00-.866-.5A3 3 0 017.4 11.5a.5.5 0 00-.866.5A4 4 0 0010 14z" clipRule="evenodd" />
    </svg>
);


const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};

type TimerState = 'idle' | 'running' | 'paused';

const App = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
    const [logs, setLogs] = useLocalStorage<Log[]>('logs', []);
    const [activeTaskId, setActiveTaskId] = useLocalStorage<string | null>('activeTaskId', null);
    const [timer, setTimer] = useState(0);
    const [timerState, setTimerState] = useState<TimerState>('idle');
    const [newTaskName, setNewTaskName] = useState('');
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [analysis, setAnalysis] = useState('');
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const activeTask = useMemo(() => tasks.find(task => task.id === activeTaskId), [tasks, activeTaskId]);
    
    useEffect(() => {
        if (timerState === 'running') {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
             if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [timerState]);

    useEffect(() => {
        const timerId = setInterval(() => setCurrentDateTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    
    useEffect(() => {
        // If there's an active task on load but the timer isn't running, set to paused
        if (activeTaskId && timer > 0 && timerState !== 'running') {
            setTimerState('paused');
        } else if (!activeTaskId) {
            setTimerState('idle');
            setTimer(0);
        }
    }, [activeTaskId]);

    const { totalToday, totalAllTime } = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        let todaySecs = 0;
        let allTimeSecs = 0;

        if (activeTaskId) {
            logs.forEach(log => {
                if (log.taskId === activeTaskId) {
                    if (log.startTime >= startOfToday) {
                        todaySecs += log.duration;
                    }
                    allTimeSecs += log.duration;
                }
            });
        }
        return { totalToday: todaySecs, totalAllTime: allTimeSecs };
    }, [logs, activeTaskId]);

    const weeklyChartData = useMemo(() => {
        const data = Array(7).fill(null).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const day = d.toLocaleDateString('ja-JP', { weekday: 'short' });
            return { name: day, '時間': 0, date: d.toISOString().split('T')[0] };
        }).reverse();

        if (activeTaskId) {
            logs.forEach(log => {
                if (log.taskId === activeTaskId) {
                    const logDate = new Date(log.startTime).toISOString().split('T')[0];
                    const dayData = data.find(d => d.date === logDate);
                    if (dayData) {
                        dayData['時間'] += log.duration / 60; // minutes
                    }
                }
            });

            const todayData = data.find(d => d.date === new Date().toISOString().split('T')[0]);
            if (todayData) {
                 todayData['時間'] += timer / 60;
            }
        }

        return data.map(d => ({ name: d.name, '時間': Math.round(d['時間']) }));
    }, [logs, activeTaskId, timer]);

    const handleSaveAndFinish = () => {
        if (!activeTaskId) return;

        const duration = timer;
        const endTime = Date.now();
        const startTime = endTime - (duration * 1000);

        if (duration > 0) {
            const newLog: Log = {
                id: uuidv4(),
                taskId: activeTaskId,
                startTime,
                endTime,
                duration,
                comment,
            };
            setLogs(prev => [...prev, newLog]);
        }

        setActiveTaskId(null);
        setTimer(0);
        setTimerState('idle');
        setComment('');
        setIsCommentModalOpen(false);
    };

    const handleAddTask = () => {
        if (newTaskName.trim()) {
            const newTask: Task = { id: uuidv4(), name: newTaskName.trim() };
            setTasks(prev => [...prev, newTask]);
            setActiveTaskId(newTask.id);
            setTimer(0);
            setTimerState('idle');
            setNewTaskName('');
        }
    };
    
    const handleFinishClick = () => {
        setTimerState('paused');
        setIsCommentModalOpen(true);
    };
    
    const handlePauseClick = () => {
        setTimerState('paused');
    };

    const handleResumeClick = () => {
        setTimerState('running');
    };
    
    const handleCancelModal = () => {
        setIsCommentModalOpen(false);
        // If timer was paused for the modal, keep it paused. 
        // User must explicitly click Resume.
    };

    const handleAnalysis = useCallback(async () => {
        if (!activeTask) return;
        setIsLoadingAnalysis(true);
        setAnalysis('');
        try {
            const recentLogs = logs.filter(l => l.taskId === activeTask.id).slice(-5).reverse();
            const analysisText = await getAnalysis(weeklyChartData, recentLogs, activeTask.name);
            setAnalysis(analysisText);
        } catch (error) {
            console.error(error);
            setAnalysis("分析の取得中にエラーが発生しました。APIキーが設定されているか確認してください。");
        } finally {
            setIsLoadingAnalysis(false);
        }
    }, [activeTask, logs, weeklyChartData]);

    const handleTaskSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        if (selectedId) {
            setActiveTaskId(selectedId);
            setTimer(0);
            setTimerState('idle');
        }
    };
    
    return (
        <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center">
            <main className="w-full max-w-4xl mx-auto">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">タスクタイマー</h1>
                    <p className="mt-4 text-slate-400">勉強やゲーム、様々なタスクの成長記録をつけるためのタイマーです。一緒に頑張ろう！</p>
                </div>
                
                <div className="mb-8">
                    <PromotionBanner />
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700 shadow-lg">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center text-lg">
                            <ClockIcon /> {currentDateTime.toLocaleTimeString('ja-JP')}
                        </div>
                        <div className="flex items-center text-lg">
                            <CalendarIcon /> {currentDateTime.toLocaleDateString('ja-JP')}
                        </div>
                    </div>
                    
                    {!activeTask ? (
                         <div className="mt-6 text-center">
                             <h2 className="text-2xl font-bold text-slate-100 mb-4">タスクを開始</h2>
                             <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                <input
                                    type="text"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    placeholder="新しいタスク名"
                                    className="bg-slate-900 border border-slate-600 rounded-md px-4 py-2 w-full sm:w-auto flex-grow focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                                />
                                <button onClick={handleAddTask} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md w-full sm:w-auto transition-colors">
                                    新規開始
                                </button>
                             </div>
                             {tasks.length > 0 && (
                                <>
                                    <p className="my-4 text-slate-400">または</p>
                                    <select onChange={handleTaskSelection} defaultValue="" className="bg-slate-900 border border-slate-600 rounded-md px-4 py-2 w-full max-w-xs mx-auto focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                                        <option value="" disabled>既存のタスクを選択</option>
                                        {tasks.map(task => (
                                            <option key={task.id} value={task.id}>{task.name}</option>
                                        ))}
                                    </select>
                                </>
                             )}
                         </div>
                    ) : (
                        <div className="mt-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-indigo-400">{activeTask.name}</h2>
                                <p className="text-7xl font-bold my-4 tracking-wider">{formatTime(timer)}</p>
                                <div className="flex justify-center items-center gap-4">
                                    {timerState === 'idle' && (
                                        <button onClick={() => setTimerState('running')} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
                                            開始
                                        </button>
                                    )}
                                    {timerState === 'running' && (
                                        <button onClick={handlePauseClick} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
                                            一時停止
                                        </button>
                                    )}
                                    {timerState === 'paused' && (
                                        <button onClick={handleResumeClick} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
                                            再開
                                        </button>
                                    )}
                                    {(timerState === 'running' || timerState === 'paused') && (
                                        <button onClick={handleFinishClick} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg">
                                            終了
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                <div className="bg-slate-900/50 p-4 rounded-md">
                                    <p className="text-sm text-slate-400">今日の累計</p>
                                    <p className="text-2xl font-semibold">{formatTime(totalToday + timer)}</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-md">
                                    <p className="text-sm text-slate-400">総合累計</p>
                                    <p className="text-2xl font-semibold">{formatTime(totalAllTime + timer)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {activeTask && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                             <h3 className="text-xl font-bold mb-4 text-slate-100">週間レポート</h3>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" label={{ value: '分', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} cursor={{fill: '#334155'}}/>
                                    <Bar dataKey="時間" fill="#22d3ee" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                         <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                             <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-100">AIによる生産性分析</h3>
                                <button onClick={handleAnalysis} disabled={isLoadingAnalysis} className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600">
                                    <AiIcon/> {isLoadingAnalysis ? '分析中...' : '分析'}
                                </button>
                             </div>
                             {isLoadingAnalysis ? (
                                <div className="space-y-4">
                                    <div className="bg-slate-700 animate-pulse h-4 w-full rounded"></div>
                                    <div className="bg-slate-700 animate-pulse h-4 w-5/6 rounded"></div>
                                    <div className="bg-slate-700 animate-pulse h-4 w-full rounded"></div>
                                </div>
                             ) : (
                                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{analysis || '上のボタンを押して、AIによる分析を開始してください。'}</p>
                             )}
                        </div>
                     </div>
                )}

                {isCommentModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4">
                            <h2 className="text-xl font-bold mb-4">お疲れ様でした！</h2>
                            <p className="text-slate-400 mb-4 text-sm">作業内容について一言コメントを残してください。作業の調子やその日にあったことを振り返ることでAIが正確に分析をしてくれるようになります。</p>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="例：集中して〇〇を終わらせた"
                                className="bg-slate-900 border border-slate-600 rounded-md px-4 py-2 w-full h-24 mb-6 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                            <div className="flex flex-col sm:flex-row justify-end gap-4">
                                 <button onClick={handleCancelModal} className="text-slate-400 hover:text-white px-4 py-2 rounded-md">キャンセル</button>
                                <button onClick={handleSaveAndFinish} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    保存して終了
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;