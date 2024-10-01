import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
// import { DateRange } from "react-date-range";
// import { DatePicker } from 'rsuite';
// import { DatePicker } from "react-date-range";
// import { DatePicker } from '@mui/x-date-pickers';
import DatePicker from "react-datepicker";
// import "./CSS/dashboard-date.css"
import "react-datepicker/dist/react-datepicker.css";
const OfflineEntryModal = ({ isOpen, onRequestClose }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const [formData, setFormData] = useState({
        user_id:2,
        designation: '',
        department: '',
        phone: '',
        title: '',
        details: '',
        halldate: endDate,
        timefrom: '',
        timeto: '',
        coordinatorname: '',
        guestname: '',
        numberofguests: '',
        numberofattendents: '2',
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "user_id",
            "designation",
            "department",
            "phone",
            "title",
            "details",
            "halldate",
            "timefrom",
            "timeto",
            "coordinatorname",
            "guestname",
            "numberofguests",
            "numberofattendents",

        ];


        setFormData({
            ...formData,
            halldate: endDate
        })
        for (let field of requiredFields) {
            if (!formData[field]) {
                alert(`Please fill out the ${field} field.`);
                return;
            }
        }




        // console.log(endDate,'\t', formattedEndDate);
        console.log('Form data:', formData);
        try {
            const response = await axios.post('http://localhost:4000/create-event-booking', formData);
            console.log('Order created successfully:', response.data);
            onRequestClose();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Offline Entry Modal"
            className="fixed inset-0 flex items-center justify-center z-50 "
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-slate-300  rounded-lg shadow-xl max-w-lg w-full p-6 max-h-screen overflow-y-auto">
                {/* heddo parto*/}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img
                            src="/src/assets/logoBlack.png"
                            alt="Aditi Residency Logo"
                            className="w-12 h-12 mr-3"
                        />
                        <h2 className="text-3xl font-semibold text-blue-400">Request new entry</h2>
                    </div>
                    <button
                        onClick={onRequestClose}
                        className="text-gray-600 hover:text-gray-900 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/*main formuu */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="department"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="text"
                            name="details"
                            placeholder="Details"
                            value={formData.details}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="text"
                            name="timefrom"
                            placeholder="Start time eg(12:30:am)"
                            value={formData.timefrom}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="text"
                            name="timeto"
                            placeholder="End time eg(12:30:am)"
                            value={formData.timeto}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                       
                        <div className="relative col-span-2">
                            <input type="button"
                                className='border rounded-md p-2 w-[48%] mr-2 focus:outline-none focus:border-yellow-500'
                                value="Select Check Out :" />
                            <DatePicker
                                className='border rounded-md h-full p-2 focus:outline-none focus:border-yellow-500'
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                // minDate={startDate}
                                // selectsEnd
                                startDate={new Date()}
                                // endDate={endDate}
                            />
                        </div>

                        <input
                            type="number"
                            name="coordinatorname"
                            placeholder="Number of Adults"
                            value={formData.coordinatorname}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />

                        <input
                            type="number"
                            name="guestname"
                            placeholder="Guest name"
                            value={formData.guestname}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />

                    
                        <input
                            type="number"
                            name="numberofguests"
                            placeholder="Number of guests"
                            value={formData.numberofguests}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                        <input
                            type="number"
                            name="numberofattendents"
                            placeholder="Number of Attendants"
                            value={formData.numberofattendents}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full focus:outline-none focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/*Subbumittu button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-yellow-700 transition-all"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

    );
};

export default OfflineEntryModal;