// // import { useState, useEffect } from "react";
// // import { FaRegFolder } from "react-icons/fa";
// // import Button from "./small/Button";
// // // import { Button } from "@/components/ui/button";

// // // Function to process folders
// // function extractFolderData(folder) {
// //     return {
// //         id: folder.id,
// //         name: folder.name,
// //         description: folder.description,
// //         creator_id: folder.creator_id,
// //         created_at: folder.created_at,
// //     };
// // }

// // function processFolders(folderList, result = []) {
// //     if (!Array.isArray(folderList)) {
// //         console.error("Invalid input: folderList is not an array", folderList);
// //         return result;
// //     }

// //     folderList.forEach((folder) => {
// //         result.push(extractFolderData(folder));

// //         if (folder.subfolders && Array.isArray(folder.subfolders)) {
// //             processFolders(folder.subfolders, result);
// //         }
// //     });

// //     return result;
// // }

// // function getAllFolders(folderList) {
// //     return processFolders(folderList, []);
// // }

// // // **Folder Selection Component**
// // export default function FolderSelection({ folders, setSelectedFolder, selectedFolder, closeModal, handleMoveContent, isMoving }) {
// //     const [allFolders, setAllFolders] = useState([]);
// //     //   const [selectedFolder, setSelectedFolder] = useState(null);
// // console.log("folders", folders)
// //     useEffect(() => {
// //         if (folders) {
// //             setAllFolders(getAllFolders(folders));
// //         }
// //     }, [folders]);

// //     return (
// //         <div>
// //             <p className="mb-3">Please select a folder</p>
// //             {allFolders.map((item) => (
// //                 <div
// //                     key={item.id}
// //                     onClick={() => setSelectedFolder(item.id)}
// //                     className={`flex cursor-pointer hover:bg-gray-200 mt-3 items-center gap-2 p-2 rounded-lg ${selectedFolder === item.id ? "bg-primary text-white" : "bg-gray-100"
// //                         }`}
// //                 >
// //                     <FaRegFolder /> {item.name}
// //                 </div>
// //             ))}
// //             <div className="flex justify-end gap-2 mt-4">
// //                 <Button className="bg-gray-400 text-white" text="Close" onClick={closeModal} />
// //                 <Button
// //                     className="bg-blue-500 text-white"
// //                     text="Move"
// //                     disabled={!selectedFolder || isMoving}
// //                     onClick={handleMoveContent}
// //                 />
// //             </div>
// //         </div>
// //     );
// // }

// import { useState } from "react";
// import { FaRegFolder, FaChevronRight, FaChevronDown } from "react-icons/fa";
// import Button from "./small/Button";

// // Recursive component to render each folder and its children
// function FolderItem({ folder, level, selectedFolder, onSelect, expandedFolders, toggleExpand }) {
//   // Determine if this folder is expanded
//   const isExpanded = expandedFolders[folder.id];

//   return (
//     <div style={{ marginLeft: level * 20 }}>
//       <div
//         className={`flex cursor-pointer hover:bg-gray-200 mt-3 items-center gap-2 p-2 rounded-lg ${
//           selectedFolder === folder.id ? "bg-primary text-white" : "bg-gray-100"
//         }`}
//         onClick={() => onSelect(folder.id)}
//       >
//         {/* Render an icon if the folder has subfolders */}
//         {folder.subfolders && folder.subfolders.length > 0 ? (
//           isExpanded ? (
//             <FaChevronDown onClick={(e) => { e.stopPropagation(); toggleExpand(folder.id); }} />
//           ) : (
//             <FaChevronRight onClick={(e) => { e.stopPropagation(); toggleExpand(folder.id); }} />
//           )
//         ) : (
//           <FaRegFolder />
//         )}
//         {folder.name}
//       </div>
//       {/* If the folder is expanded, recursively render its subfolders */}
//       {isExpanded &&
//         folder.subfolders &&
//         folder.subfolders.map((subfolder) => (
//           <FolderItem
//             key={subfolder.id}
//             folder={subfolder}
//             level={level + 1}
//             selectedFolder={selectedFolder}
//             onSelect={onSelect}
//             expandedFolders={expandedFolders}
//             toggleExpand={toggleExpand}
//           />
//         ))}
//     </div>
//   );
// }

// // Main FolderSelection component
// export default function FolderSelection({
//   folders,
//   setSelectedFolder,
//   selectedFolder,
//   closeModal,
//   handleMoveContent,
//   isMoving,
// }) {
//   // State to track which folders are expanded (using folder id as key)
//   const [expandedFolders, setExpandedFolders] = useState({});

//   const toggleExpand = (folderId) => {
//     setExpandedFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
//   };

//   return (
//     <div>
//       <p className="mb-3">Please select a folder</p>
//       {folders.map((folder) => (
//         <FolderItem
//           key={folder.id}
//           folder={folder}
//           level={0}
//           selectedFolder={selectedFolder}
//           onSelect={setSelectedFolder}
//           expandedFolders={expandedFolders}
//           toggleExpand={toggleExpand}
//         />
//       ))}
//       <div className="flex justify-end gap-2 mt-4">
//         <Button className="bg-gray-400 text-white" text="Close" onClick={closeModal} />
//         <Button
//           className="bg-blue-500 text-white"
//           text="Move"
//           disabled={!selectedFolder || isMoving}
//           onClick={handleMoveContent}
//         />
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { FaRegFolder, FaChevronRight, FaChevronDown } from "react-icons/fa";
import Button from "./small/Button";

// Recursive component to render a folder and its nested subfolders
function FolderItem({ folder, level, selectedFolder, onSelect, expandedFolders, toggleExpand }) {
    const isExpanded = expandedFolders[folder.id];

    return (
        <div style={{ marginLeft: level * 20 }}>
            <div
                onClick={() => onSelect(folder.id)}
                className={`flex cursor-pointer hover:bg-gray-200 mt-3 items-center gap-2 p-2 rounded-lg ${selectedFolder === folder.id ? "bg-primary text-white" : "bg-gray-100"
                    }`}
            >
                {folder.subfolders && folder.subfolders.length > 0 ? (
                    isExpanded ? (
                        <FaChevronDown
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(folder.id);
                            }}
                        />
                    ) : (
                        <FaChevronRight
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(folder.id);
                            }}
                        />
                    )
                ) : (
                    <FaRegFolder />
                )}
                {folder.name}
            </div>
            {isExpanded &&
                folder.subfolders &&
                folder.subfolders.map((subfolder) => (
                    <FolderItem
                        key={subfolder.id}
                        folder={subfolder}
                        level={level + 1}
                        selectedFolder={selectedFolder}
                        onSelect={onSelect}
                        expandedFolders={expandedFolders}
                        toggleExpand={toggleExpand}
                    />
                ))}
        </div>
    );
}

// Main component that displays the two top-level categories (Posted and Saved Topics)
// then reveals their nested hierarchy on expand.
export default function CategoryFolderSelection({
    folders, // your JSON folders object with keys: posted_topics and saved_topics
    setSelectedFolder,
    selectedFolder,
    closeModal,
    handleMoveContent,
    isMoving,
}) {
    // Build an array of top-level categories. In your folders each key is an array with one folder.
    const categories = [];
    if (folders.posted_topics && folders.posted_topics?.length > 0) {
        categories.push(folders.posted_topics[0]);
    }
    if (folders.saved_topics && folders.saved_topics?.length > 0) {
        categories.push(folders.saved_topics[0]);
    }

    // Track which folders are expanded; key is folder id.
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleExpand = (folderId) => {
        setExpandedFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
    };

    return (
        <div>
            <p className="mb-3">Please select a folder</p>
            {categories.map((category) => (
                <FolderItem
                    key={category.id}
                    folder={category}
                    level={0}
                    selectedFolder={selectedFolder}
                    onSelect={setSelectedFolder}
                    expandedFolders={expandedFolders}
                    toggleExpand={toggleExpand}
                />
            ))}
            <div className="flex justify-end gap-2 mt-4">
                <Button className="bg-gray-400 text-white" text="Close" onClick={closeModal} />
                <Button
                    className="bg-blue-500 text-white"
                    text="Move"
                    disabled={!selectedFolder || isMoving}
                    onClick={handleMoveContent}
                />
            </div>
        </div>
    );
}
