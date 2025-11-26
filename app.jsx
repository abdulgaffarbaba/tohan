import React, { useState, useRef } from 'react';
import { Search, Printer, GraduationCap, AlertCircle, CheckCircle2, School, User, Calendar, BookOpen, Download } from 'lucide-react';

// --- MOCK DATABASE ---
// In a real app, this would come from a backend (Firebase, SQL, MongoDB).
// For this demo, we use hardcoded data to simulate the experience.
const MOCK_DATABASE = {
  students: [
    {
      regNo: "STU/2024/001",
      pin: "123456",
      name: "Ibrahim Musa",
      class: "SSS 3",
      term: "Second Term",
      session: "2023/2024",
      position: "1st",
      average: 88.5,
      remarks: "An excellent performance. Keep it up!",
      subjects: [
        { name: "Mathematics", ca: 38, exam: 55, total: 93, grade: "A" },
        { name: "English Language", ca: 35, exam: 50, total: 85, grade: "A" },
        { name: "Physics", ca: 32, exam: 48, total: 80, grade: "A" },
        { name: "Chemistry", ca: 30, exam: 52, total: 82, grade: "A" },
        { name: "Biology", ca: 36, exam: 45, total: 81, grade: "A" },
        { name: "Civic Education", ca: 40, exam: 58, total: 98, grade: "A+" },
      ]
    },
    {
      regNo: "STU/2024/002",
      pin: "654321",
      name: "Chioma Okeke",
      class: "SSS 3",
      term: "Second Term",
      session: "2023/2024",
      position: "5th",
      average: 72.3,
      remarks: "A good result, but there is room for improvement in Sciences.",
      subjects: [
        { name: "Mathematics", ca: 25, exam: 40, total: 65, grade: "B" },
        { name: "English Language", ca: 35, exam: 45, total: 80, grade: "A" },
        { name: "Physics", ca: 20, exam: 35, total: 55, grade: "C" },
        { name: "Chemistry", ca: 28, exam: 42, total: 70, grade: "B" },
        { name: "Biology", ca: 30, exam: 40, total: 70, grade: "B" },
        { name: "Economics", ca: 38, exam: 56, total: 94, grade: "A" },
      ]
    }
  ]
};

export default function App() {
  const [view, setView] = useState('login'); // 'login' or 'result'
  const [formData, setFormData] = useState({ regNo: '', pin: '' });
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Simulate API call to check result
  const handleCheckResult = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const student = MOCK_DATABASE.students.find(
        (s) => s.regNo === formData.regNo && s.pin === formData.pin
      );

      if (student) {
        setStudentData(student);
        setView('result');
      } else {
        setError('Invalid Registration Number or PIN. Please try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    setStudentData(null);
    setFormData({ regNo: '', pin: '' });
    setView('login');
  };

  // --- COMPONENT: LOGIN SCREEN ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-blue-900 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Student Portal</h1>
            <p className="text-blue-100 text-sm mt-1">Check your academic results securely</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleCheckResult} className="space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="regNo"
                    placeholder="e.g., STU/2024/001"
                    value={formData.regNo}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase placeholder:normal-case"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Scratch Card PIN</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="pin"
                    placeholder="Enter 6-digit PIN (e.g., 123456)"
                    value={formData.pin}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Checking Database...</span>
                  </>
                ) : (
                  <>
                    <span>Check Result</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Demo Credentials:<br/>
                Reg No: <span className="font-mono text-gray-600">STU/2024/001</span> | PIN: <span className="font-mono text-gray-600">123456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPONENT: RESULT SHEET ---
  if (view === 'result' && studentData) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:bg-white print:p-0">
        
        {/* Toolbar - Hidden when printing */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <button 
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            ← Back to Search
          </button>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 font-medium">
                <Download size={18} />
                <span>Save PDF</span>
             </button>
             <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-800 font-medium"
            >
              <Printer size={18} />
              <span>Print Result</span>
            </button>
          </div>
        </div>

        {/* Report Card */}
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:w-full print:max-w-none">
          
          {/* Header Section */}
          <div className="bg-slate-900 text-white p-8 print:bg-white print:text-black print:border-b-4 print:border-black">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                 <div className="bg-white/10 p-3 rounded-full print:border-2 print:border-black print:bg-transparent">
                   <School size={40} className="text-blue-200 print:text-black" />
                 </div>
                 <div className="text-center md:text-left">
                   <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Global Excellence Academy</h1>
                   <p className="text-blue-200 text-sm print:text-gray-600">123 Education Close, Knowledge City, State.</p>
                   <p className="text-blue-200 text-xs mt-1 print:text-gray-600">Tel: +234 800 123 4567 | Email: info@gea.edu.ng</p>
                 </div>
              </div>
              <div className="text-center md:text-right border-t md:border-t-0 border-white/20 pt-4 md:pt-0 w-full md:w-auto">
                <h2 className="text-xl font-bold text-blue-100 print:text-black">STUDENT REPORT CARD</h2>
                <div className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold mt-2 border border-green-500/30 print:hidden">
                  RESULT VERIFIED
                </div>
              </div>
            </div>
          </div>

          {/* Student Bio-Data */}
          <div className="p-8 print:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100 print:bg-white print:border-2 print:border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Student Name</span>
                   <span className="font-bold text-gray-800">{studentData.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Admission Number</span>
                   <span className="font-bold text-gray-800">{studentData.regNo}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Class</span>
                   <span className="font-bold text-gray-800">{studentData.class}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Academic Session</span>
                   <span className="font-bold text-gray-800">{studentData.session}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Term</span>
                   <span className="font-bold text-gray-800">{studentData.term}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-gray-500 text-sm font-medium">Date Printed</span>
                   <span className="font-bold text-gray-800">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Scores Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white text-sm uppercase tracking-wider print:bg-gray-200 print:text-black">
                    <th className="p-4 text-left rounded-tl-lg print:rounded-none">Subject</th>
                    <th className="p-4 text-center">C.A (40)</th>
                    <th className="p-4 text-center">Exam (60)</th>
                    <th className="p-4 text-center">Total (100)</th>
                    <th className="p-4 text-center rounded-tr-lg print:rounded-none">Grade</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {studentData.subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 print:border-gray-300">
                      <td className="p-4 font-medium text-gray-800">{subject.name}</td>
                      <td className="p-4 text-center text-gray-600">{subject.ca}</td>
                      <td className="p-4 text-center text-gray-600">{subject.exam}</td>
                      <td className="p-4 text-center font-bold text-blue-900 print:text-black">{subject.total}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-block w-8 h-8 leading-8 rounded-full font-bold text-xs ${
                          subject.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                          subject.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                          subject.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        } print:bg-transparent print:text-black print:border print:border-gray-400`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 print:border-gray-300 print:bg-white">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Overall Average</p>
                <p className="text-3xl font-bold text-blue-900">{studentData.average}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 print:border-gray-300 print:bg-white">
                <p className="text-xs text-purple-600 font-bold uppercase mb-1">Class Position</p>
                <p className="text-3xl font-bold text-purple-900">{studentData.position}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 md:col-span-1 print:border-gray-300 print:bg-white">
                 <p className="text-xs text-green-600 font-bold uppercase mb-1">Principal's Remark</p>
                 <p className="text-sm font-medium text-green-900 italic">"{studentData.remarks}"</p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-end print:mt-16">
               <div className="text-center">
                  <div className="w-32 border-b-2 border-gray-300 mb-2"></div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Principal's Signature</p>
               </div>
               <div className="text-right">
                  <div className="w-24 h-24 mb-2 ml-auto opacity-50 bg-contain bg-no-repeat bg-center print:opacity-100" style={{ backgroundImage: 'url("https://via.placeholder.com/100?text=SEAL")' }}>
                     <School size={80} className="text-gray-200 mx-auto" strokeWidth={1} />
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Official Document</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
