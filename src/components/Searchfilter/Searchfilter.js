// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Styles from '../Searchfilter/Searchfilter.module.css';
// import { motion } from "framer-motion"
// import magnifire from "../../assets/icons/magnifire.png"
// import { FaFilter, FaSearch, FaSlidersH, FaTags } from "react-icons/fa";

// const Searchfilter = () => {
//     const navigate = useNavigate();

//     const [brands, setProduct] = useState([]);
//     const [models, setModels] = useState([]);
//     const [years, setYears] = useState([]);
//     const [filterState, setFilterState] = useState({});

//     const handleChange = (e) => {
//         if (e.target.name === "brand") {
//             fetchModels(e.target.value)
//         }
//         if (e.target.name === "model") {
//             fetchYears(e.target.value)
//         }
//         setFilterState((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }))


//     }

//     useEffect(() => {
//         fetchProductt();
//     }, []);


//     const fetchProductt = async () => {
//         try {
//             const response = await axios.get(`${process.env.APP_BACKEND}/product/products`);
//             setProduct(response.data);
//         } catch (error) {
//             console.error('Error fetching brands:', error);
//         }
//     };

//     const fetchModels = async (brandId) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/model/byBrand/${brandId}`);
//             setModels(response.data);
//         } catch (error) {
//             console.error('Error fetching models:', error);
//         }
//     };

//     const fetchYears = async (modelId) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/year/byModel/${modelId}`);
//             setYears(response.data);
//         } catch (error) {
//             console.error('Error fetching years:', error);
//         }
//     };

//     const handleSearch = () => {
//         navigate('/product', { state: { filterState } })
//     };

//     return (
//         <motion.div className={Styles.container}>
//           <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
//                 <select
//                     className={Styles.input}
//                     id="brandSelect"
//                     name="brand"
//                     value={filterState.model && filterState.brand.brand}
//                     onChange={handleChange}
//                 >
//                     <option className={Styles.option} value=''>Select category</option>
//                     {brands.map((brand) => (
//                         <option key={brand._id} value={brand._id}>
//                             {brand.brand}
//                         </option>
//                     ))}
//                 </select>
//             </motion.div>
//             <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
//                 <select
//                     className={Styles.input}
//                     id="modukeSelect"
//                     name="model"
//                     value={filterState.model && filterState.model.name}
//                     onChange={handleChange}
//                 >
//                     <option className={Styles.option} value=''>Select Product(sub)</option>
//                     {models.map((model) => (
//                         <option key={model._id} value={model._id}>
//                             {model.name}
//                         </option>
//                     ))}
//                 </select>
//             </motion.div>
//           {/* </div> */}
    
//           {/* <div className={Styles.flexing}> */}
//             <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} >
//                 <select
//                     className={Styles.input}
//                     id="brandSelect"
//                     name="brand"
//                     value={filterState.model && filterState.brand.brand}
//                     onChange={handleChange}
//                 >
//                     <option className={Styles.option} value=''>Type Of skin</option>
//                     {brands.map((brand) => (
//                         <option key={brand._id} value={brand._id}>
//                             {brand.brand}
//                         </option>
//                     ))}
//                 </select>
//             </motion.div>
//             <motion.div initial={{ opacity: 0.5, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} >
//                 <select
//                     className={Styles.input}
//                     id="brandSelect"
//                     name="brand"
//                     value={filterState.model && filterState.brand.brand}
//                     onChange={handleChange}
//                 >
//                     <option className={Styles.option} value=''>Ingrediants</option>
//                     {brands.map((brand) => (
//                         <option key={brand._id} value={brand._id}>
//                             {brand.brand}
//                         </option>
//                     ))}
//                 </select>
//             </motion.div>
          
//             <motion.button className={`${Styles.btn} ${Styles.hoverEffect}`} onClick={handleSearch} initial={{ opacity: 0.7, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
//   <FaSlidersH className={`${Styles.filterIcon} ${Styles.hoverEffect}`} />
// </motion.button>

       
       
            
//         </motion.div>
//     );
// };

// export default Searchfilter;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from '../Searchfilter/Searchfilter.module.css';
import { motion } from "framer-motion"
import { FaSlidersH } from "react-icons/fa";
import useFilterStore from "../filterStore"

const Searchfilter = ({ onFilterChange }) => {
    const navigate = useNavigate();
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const [productData, setProductData] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filterState, setFilterState] = useState({});
    const filterData = useFilterStore((state) => state.filterData);

    useEffect(() => {
        const fetchData = async () => {
            fetchSkinTypes();
            fetchIngredients();
            fetchCategories();
        };
      
        fetchData();
    }, []);

    const fetchSkinTypes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/product/getall");
            if (!response.data) {
                throw new Error("Failed to fetch products");
            }
            setProductData(response.data);
            setIsLoadingProducts(false);
        } catch (error) {
            console.error(error);
            setIsLoadingProducts(false);
        }
    }

    const fetchIngredients = async () => {
        try {
            const response = await axios.get("http://localhost:5000/ingrediants");
            if (!response.data) {
                throw new Error("Failed to fetch ingrediants");
            }
            setIngredients(response.data);
            setIsLoadingProducts(false);
        } catch (error) {
            console.error(error);
            setIsLoadingProducts(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/category/getall");
            if (!response.data) {
                throw new Error("Failed to fetch category");
            }
            setCategories(response.data.categories);
            setIsLoadingProducts(false);
        } catch (error) {
            console.error(error);
            setIsLoadingProducts(false);
        }
    }

    const fetchSubCategories = async (id) => {
        try {
            let res = await axios.get(
                `http://localhost:5000/subCategory/getsubbycategory/${id}`
            );
            setSubCategories(res.data.subCategories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            fetchSubCategories(value);
        }

        setFilterState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/product/products", { params: filterState });
            onFilterChange(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const resetFilter = () => {
        setFilterState({});
        handleSearch();
    };

    return (
        <motion.div className={Styles.container}>
            <div>
                <select
                    className={Styles.input}
                    name="skinType"
                    value={filterState.skinType || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Skin Type</option>
                    {productData.map(type => (
                        <option key={type._id} value={type.skinType}>{type.skinType}</option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    className={Styles.input}
                    name="ingredient"
                    value={filterState.ingredient || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Ingredient</option>
                    {ingredients.map(ingredient => (
                        <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    className={Styles.input}
                    name="category"
                    value={filterState.category || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    className={Styles.input}
                    name="subCategory"
                    value={filterState.subCategory || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Subcategory</option>
                    {subCategories && subCategories.map(subCategory => (
                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                    ))}
                </select>
            </div>
            <motion.button
                className={`${Styles.btn} ${Styles.hoverEffect}`}
                onClick={handleSearch}
            >
                <FaSlidersH className={`${Styles.filterIcon} ${Styles.hoverEffect}`} />
            </motion.button>
            <button onClick={resetFilter}>Reset</button>
        </motion.div>
    );
};

export default Searchfilter;
