'use client';

import { useState } from 'react';

type TaskStatus = 'Pending' | 'Running' | 'Completed';

interface SubTask {
  id: string;
  title: string;
  status: TaskStatus;
}

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  subTasks: SubTask[];
  isEditing: boolean;
  showSubTasks: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // タスクの作成
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: 'Pending',
        subTasks: [],
        isEditing: false,
        showSubTasks: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  // タスクの削除
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // タスクのタイトル編集
  const updateTaskTitle = (taskId: string, newTitle: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, title: newTitle, isEditing: false } : task
    ));
  };

  // タスクのステータス変更
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // タスクの編集モード切り替え
  const toggleTaskEditing = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
    ));
  };

  // サブタスクの表示/非表示切り替え
  const toggleSubTasks = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, showSubTasks: !task.showSubTasks } : task
    ));
  };

  // サブタスクの追加
  const addSubTask = (taskId: string, subTaskTitle: string) => {
    if (subTaskTitle.trim()) {
      const newSubTask: SubTask = {
        id: Date.now().toString(),
        title: subTaskTitle,
        status: 'Pending',
      };
      setTasks(tasks.map(task =>
        task.id === taskId
          ? { ...task, subTasks: [...task.subTasks, newSubTask] }
          : task
      ));
    }
  };

  // サブタスクの削除
  const deleteSubTask = (taskId: string, subTaskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, subTasks: task.subTasks.filter(st => st.id !== subTaskId) }
        : task
    ));
  };

  // サブタスクのタイトル更新
  const updateSubTaskTitle = (taskId: string, subTaskId: string, newTitle: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subTasks: task.subTasks.map(st =>
              st.id === subTaskId ? { ...st, title: newTitle } : st
            )
          }
        : task
    ));
  };

  // サブタスクのステータス更新
  const updateSubTaskStatus = (taskId: string, subTaskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subTasks: task.subTasks.map(st =>
              st.id === subTaskId ? { ...st, status: newStatus } : st
            )
          }
        : task
    ));
  };

  // ステータスバッジのスタイル
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-200 text-gray-700';
      case 'Running':
        return 'bg-blue-200 text-blue-700';
      case 'Completed':
        return 'bg-green-200 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">TODO管理アプリ</h1>

        {/* タスク作成フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              追加
            </button>
          </div>
        </div>

        {/* タスクリスト */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
              {/* タスク情報 */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  {task.isEditing ? (
                    <input
                      type="text"
                      defaultValue={task.title}
                      onBlur={(e) => updateTaskTitle(task.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateTaskTitle(task.id, e.currentTarget.value);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                  )}
                </div>

                {/* ステータス選択 */}
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* タスク操作ボタン */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTaskEditing(task.id)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </div>
              </div>

              {/* サブタスクセクション */}
              <div className="mt-4">
                <button
                  onClick={() => toggleSubTasks(task.id)}
                  className="text-sm text-gray-600 hover:text-gray-800 mb-2 flex items-center gap-1"
                >
                  <span>{task.showSubTasks ? '▼' : '▶'}</span>
                  <span>サブタスク ({task.subTasks.length})</span>
                </button>

                {task.showSubTasks && (
                  <div className="ml-6 mt-3 space-y-3">
                    {/* サブタスク追加フォーム */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="サブタスクを追加..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSubTask(task.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* サブタスクリスト */}
                    {task.subTasks.map(subTask => (
                      <div key={subTask.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          defaultValue={subTask.title}
                          onBlur={(e) => updateSubTaskTitle(task.id, subTask.id, e.target.value)}
                          className="flex-1 px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                          value={subTask.status}
                          onChange={(e) => updateSubTaskStatus(task.id, subTask.id, e.target.value as TaskStatus)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subTask.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Running">Running</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => deleteSubTask(task.id, subTask.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            タスクがありません。上のフォームから新しいタスクを追加してください。
          </div>
        )}
      </div>
    </div>
  );
}
