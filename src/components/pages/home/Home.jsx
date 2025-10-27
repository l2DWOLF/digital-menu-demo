import "./css/home.css";
import { useEffect, useMemo, useState } from "react";
import { Trash2, PencilLine } from 'lucide-react';
import defaultMenu from "../../../../db/menu.json";
import AddMenuItem from "../../forms/AddMenuItem.jsx";
import { errorMsg, infoMsg, successMsg} from "../../../utils/toastify.js";

function Home() {
    const [menu, setMenu] = useState([]);
    const [viewMode, setViewMode] = useState("table");
    const [formState, setFormState] = useState({open: false, item: null});
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("");
    const [sortType, setSortType] = useState("");
    const formMode = formState.item ? "edit" : "add";
    const fallbackImage = "https://cdn.pixabay.com/photo/2022/05/05/06/05/mix-grill-platter-7175372_1280.jpg";

    useEffect(() => {
        try{
            const localMenu = localStorage.getItem('local-menu');
            if(localMenu){
                const parsedMenu = JSON.parse(localMenu);
                if (parsedMenu?.length > 0) {
                    setMenu(parsedMenu);
                    successMsg("Menu loaded successfully..!");
                };
            } else { seedDB(); };
        } catch(err) {
            console.error('Failed to load local menu:', err);
            errorMsg('Failed to load local menu');
            seedDB();
        };
    }, []);
    useEffect(() => {
        if (menu.length) {
            localStorage.setItem("local-menu", JSON.stringify(menu));
        }
    }, [menu]);

    const categories = useMemo(() => {
        return [...new Set(menu.map(item => item.category))];
    }, [menu]);

    function seedDB(reset = false) {
        if (reset) {
            const confirmReset = window.confirm("Are you sure you want to Reset your Database?");
            if (!confirmReset) return;
            localStorage.clear();
        };
        const seededMenu = defaultMenu.menu.map((item, index) => ({
            id: index + 1,
            ...item,
        }));
        setMenu(seededMenu);
        successMsg("Database seeded successfully..!");
    };

    const handleDelete = (id, name) => {
        const confirm = window.confirm(`Are you sure you want to delete - ${name} ?..`);
        if (confirm) {
            const filteredMenu = menu.filter(item => item?.id !== id);
            setMenu(filteredMenu);
            infoMsg(`Item "${name}" was deleted.`);
        }
    };

    const toggleForm = (item = null, add = null) => {
        if (formState?.open && formState?.item && formState?.item?.id === item?.id) 
            { infoMsg("Edit form is already open with this item"); return; };

        setFormState(prev => {
            if (add) return { open: true, item: null };
            if (item) return { open: true, item };
            return { open: !prev.open, item: null };
        });
    };

    const filteredMenu = useMemo(() => {
        return menu.filter(item => {
            const matchingSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());

            let matchingFilter = true;
            if (filterType === "my_dishes") {
                matchingFilter = item.by_user === true;
            } else if (filterType) {
                matchingFilter = item.category === filterType;
            };
            return matchingSearch && matchingFilter;
        }).sort((a, b) => {
            if (sortType === "price-asc") return Number(a.price) - Number(b.price);
            if (sortType === "price-desc") return Number(b.price) - Number(a.price);
            if (sortType === "prep-asc") return Number(a.preparation_time) - Number(b.preparation_time);
            if (sortType === "prep-desc") return Number(b.preparation_time) - Number(a.preparation_time)
            if (sortType === "user-asc") return a.by_user === b.by_user ? 0 : a.by_user ? -1 : 1;
            if (sortType === "user-desc") return a.by_user === b.by_user ? 0 : a.by_user ? 1 : -1;
            return 0;
        });
    }, [menu, searchQuery, filterType, sortType]);
        

    function toggleSort(type) {
        if (sortType === `${type}-asc`) setSortType(`${type}-desc`);
        else if (sortType === `${type}-desc`) setSortType(`${type}-asc`);
        else setSortType(`${type}-asc`);
    };

    const handleMenuClick = (e) => {
        const btn = e.target.closest("button[data-action]");
        if(!btn) return;

        const action = btn.dataset.action;
        const id = Number(btn.dataset.id);

        const item = menu.find((item) => item.id === id);
        if(!item && action !== "add") return;

        switch(action){
            case "edit":
                toggleForm(item);
                break;
            case "delete":
                handleDelete(item.id, item.name);
                break;
            default:
                break;
        };
    };

    return (
        <div className="home-div">

            <h1>Digital Menu</h1>
            <h2>Manage & View your Digital Menu</h2>
            <div className="control-bar">
                <div className="tool-bar">
                    <button title="Reset DB" onClick={() => setFilterType("")}>All dishes</button>
                    <button title="Add new item" onClick={() => toggleForm(null, true)}>
                        Add item
                    </button>
                    <button title="My dishes" onClick={() => setFilterType("my_dishes")}>
                        My dishes
                    </button>
                    <button title="Reset DB" onClick={() => seedDB(true)}>Reset DB</button>

                    {formState.open && (<AddMenuItem 
                        closeForm={() => setFormState({open: false, item: null})}
                        selectedItem={formState.item} existingMenu={menu}
                        onSave={(savedItem) => {
                            if (formMode === "add") {
                                setMenu((prev) => [...prev, savedItem]);
                            } else {
                                setMenu((prev) =>
                                    prev.map((item) => item.id === savedItem.id ? savedItem : item)
                                );
                            };
                            setFormState({ open: false, item: null });
                        }} />
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Search by name, category, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="view-toggle-btns">
                    <button onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "active" : ""}
                    >Grid</button>
                    <button onClick={() => setViewMode("table")}
                        className={viewMode === "table" ? "active" : ""}
                    >Table</button>
                </div>
            </div>

            <div className="menu-control">
                <ul className="sort-list">
                    <li onClick={() => { setSortType(""); setFilterType("") }} className={!sortType ? "active" : ""}>
                        Reset
                    </li>

                    <li onClick={() => toggleSort("price")}
                        className={sortType.startsWith("price") ? "active" : ""}
                    >
                        Price {sortType.startsWith("price") && (sortType.endsWith("asc") ? "↑" : "↓")}
                    </li>
                    <li onClick={() => toggleSort("prep")}
                        className={sortType.startsWith("prep") ? "active" : ""}
                    >
                        Prep Time {sortType.startsWith("prep") && (sortType.endsWith("asc") ? "↑" : "↓")}
                    </li>
                    <li onClick={() => toggleSort("user")}
                        className={sortType.startsWith("user") ? "active" : ""}
                    >
                        User/DB {sortType.startsWith("user") && (sortType.endsWith("asc") ? "↑" : "↓")}
                    </li>
                </ul>
            </div>

            <div className="menu-display">
                <h3>Food Menu</h3>
                {viewMode === "table" && (
                    <div className="table-view">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th className="mobile-hide">Description</th>
                                    <th>Prep</th>
                                    <th>Price</th>
                                    <th>Manage</th>
                                </tr>
                            </thead>
                            <tbody onClick={handleMenuClick}>
                                {filteredMenu?.length > 0 ? filteredMenu?.map((item) => (
                                    <tr key={item?.id}>
                                        <td>{item?.id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.category}</td>
                                        <td className="td-description mobile-hide">{item?.description}</td>
                                        <td>{item?.preparation_time} דקות</td>
                                        <td>${item?.price}</td>
                                        <td className="table-item-control">
                                            <button data-action="delete" data-id={item?.id}><Trash2 /></button>
                                            <button data-action="edit" data-id={item?.id}><PencilLine /></button>
                                        </td>
                                    </tr>)) : (<tr className="empty-menu-msg">
                                        <td> 
                                            <div>
                                                {menu.length < 0 ? (<p>
                                                    You have no items on your menu - Add new Dishes or
                                                    <button className="seed-btn" onClick={seedDB}>CLICK HERE</button>
                                                    to seed the menu.

                                                    </p>) : (<p>
                                                        You have no custom items - <button title="Add new item" onClick={() => toggleForm(null, true)}>
                                                            New Item
                                                        </button> click to add a new menu item. 
                                                    </p>)
                                                }
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                )}
                {viewMode === "grid" && (
                    <div className="grid-view" onClick={handleMenuClick}>
                        {filteredMenu?.length > 0 ? filteredMenu?.map((item) => (
                            <div className="card" key={item?.id}>
                                <img src={fallbackImage || ""} alt={`photo of ${item?.name}`} />
                                <div className="card-data">
                                    <h4>{item?.name}</h4>
                                    <h5 className="mobile-hide">{item?.category}</h5>
                                    <p className="item-description mobile-hide">{item?.description}.</p>
                                    <div className="price-prep">
                                        <p className="show-mobile">{item?.category}</p>
                                        <p>{item?.preparation_time} דקות</p>
                                        <p> {item?.price} $</p>

                                    </div>
                                </div>
                                <div className="manage-card-item">
                                    <button data-action="edit" data-id={item.id}><PencilLine /></button>
                                    <button data-action="delete" data-id={item.id}><Trash2 /></button>
                                </div>
                            </div>
                        )) : (<div className="empty-menu-msg">

                                {menu.length < 0 ? (<p>
                                    You have no items on your menu - Add new Dishes or
                                    <button className="seed-btn" onClick={seedDB}>CLICK HERE</button>
                                    to seed the menu.

                                </p>) : (<p>
                                    You have no custom items - <button title="Add new item" onClick={() => toggleForm(null, true)}>
                                        New Item
                                    </button> click to add a new menu item.
                                </p>)
                                }
                        </div>)
                        }
                    </div>
                )}
                <div className="category-filter">
                    {categories?.length > 0 ? (
                        <ul>
                            <p>Categories:</p>
                            <li onClick={() => setFilterType("")} style={{ listStyleType: "none" }}>
                                הצג הכל
                            </li>
                            {categories.map((category, index) => (
                                <li key={index} onClick={() => setFilterType(category)}
                                    className={filterType === category ? "active" : ""}
                                >{category}</li>
                            ))}
                        </ul>
                    ) : (<p> no categories </p>)
                    }
                </div>
            </div>
        </div>)
}
export default Home