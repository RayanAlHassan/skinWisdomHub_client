import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M21.5 20.9l-5.2-5.2c1.2-1.5 1.9-3.5 1.9-5.7 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2.2 0 4.2-.7 5.7-1.9l5.2 5.2c.2.2.4.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4zM2 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" />
        </svg>
      </div>
      {isExpanded && (
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      )}
    </div>
  );
};

export default SearchBar;
