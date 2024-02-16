import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from '../Searchfilter/Searchfilter.module.css';
import { motion } from "framer-motion"

const Searchfilter = () => {
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [filterState, setFilterState] = useState({});

    const handleChange = (e) => {
        if (e.target.name === "brand") {
            fetchModels(e.target.value)
        }
        if (e.target.name === "model") {
            fetchYears(e.target.value)
        }
        setFilterState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))


    }

    useEffect(() => {
        fetchBrands();
    }, []);


    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/brand/readBrand`);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchModels = async (brandId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/model/byBrand/${brandId}`);
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const fetchYears = async (modelId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`);
            setYears(response.data);
        } catch (error) {
            console.error('Error fetching years:', error);
        }
    };

    const handleSearch = () => {
        navigate('/product', { state: { filterState } })
    };

    return (
        <motion.div className={Styles.container}>
          {/* <div className={Styles.flexing}> */}
          <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <select
                    className={Styles.input}
                    id="brandSelect"
                    name="brand"
                    value={filterState.model && filterState.brand.brand}
                    onChange={handleChange}
                >
                    <option className={Styles.option} value=''>Select category</option>
                    {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                            {brand.brand}
                        </option>
                    ))}
                </select>
            </motion.div>
            <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <select
                    className={Styles.input}
                    id="modukeSelect"
                    name="model"
                    value={filterState.model && filterState.model.name}
                    onChange={handleChange}
                >
                    <option className={Styles.option} value=''>Select Product(sub)</option>
                    {models.map((model) => (
                        <option key={model._id} value={model._id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </motion.div>
          {/* </div> */}
    
          <div className={Styles.flexing}>
            <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} >
                <select
                    className={Styles.input}
                    id="brandSelect"
                    name="brand"
                    value={filterState.model && filterState.brand.brand}
                    onChange={handleChange}
                >
                    <option className={Styles.option} value=''>Type Of skin</option>
                    {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                            {brand.brand}
                        </option>
                    ))}
                </select>
            </motion.div>
            <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <input className={Styles.ingred}type="text" placeholder='mention ingrediants that cause allergic '></input>
            </motion.div>
            <motion.button className={Styles.btn} onClick={handleSearch} initial={{ opacity: 0.7, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                Search
            </motion.button>

            </div>
       
            
        </motion.div>
    );
};

export default Searchfilter;
