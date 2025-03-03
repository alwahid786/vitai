// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setAddFolderData, setFolderName } from "../../../../redux/slice/sidebarSlice";
// import Folder from "./Folder";
// import Content from "./Content";


// const getFolderPath = (targetId, folders, level = 0, path = {}) => {
//     for (let folder of folders) {
//         // Build a new path including the current folder at this level.
//         const newPath = { ...path, [level]: { id: folder.id, name: folder.name } };

//         // If this folder is the target, return the complete path.
//         if (folder.id === targetId) {
//             return newPath;
//         }

//         // Otherwise, if the folder has subfolders, search recursively.
//         if (folder.subfolders && folder.subfolders.length > 0) {
//             const result = getFolderPath(targetId, folder.subfolders, level + 1, newPath);
//             if (result) return result;
//         }
//     }
//     return null;
// };

// const ContentTree = ({ allFolders, addArticlesHandler }) => {
//     const [openFolders, setOpenFolders] = useState({}); // Store open folders per level
//     const [activeContextMenu, setActiveContextMenu] = useState(null); // Track active context menu folder
//     const [contextMenuPosition, setContextMenuPosition] = useState(null); // Track menu position
//     const dispatch = useDispatch();
//     console.log("content", allFolders);



//     console.log("openFolders", openFolders)
//     const SelectedFolderName = Object.values(openFolders).map(folder => folder?.name).join('/');
//     console.log("foldername", SelectedFolderName);
//     // Assuming your Redux store holds the selected folder in state.sidebar.addFolder.
//     const selectedFolderState = useSelector((state) => state.sidebar.addFolder);
//     const selectedFolderId = selectedFolderState ? selectedFolderState.folderId : null;
    
//     const folderName = useSelector((state) => state.sidebar.folderName);
//     console.log("folderName", folderName);
//     // When the selected folder changes, compute the full folder path (with id and name)
//     // and update the openFolders state.
//     useEffect(() => {
//         if (selectedFolderId && allFolders && allFolders.saved_topics) {
//             const folderPath = getFolderPath(selectedFolderId, allFolders.saved_topics);
//             if (folderPath) {
//                 setOpenFolders(folderPath);
//             }
//         }
//     }, [selectedFolderId, allFolders]);
    
//     useEffect (() => {

//         dispatch(setFolderName(SelectedFolderName))
//     },[SelectedFolderName])








//     // Toggle Folder Open/Close with Level-wise Behavior
//     const toggleFolder = (id, level) => {
//         console.log("level", level)

//         setOpenFolders((prev) => ({
//             ...prev,
//             [level]: prev[level] === id ? null : id, // Toggle folder open/close
//         }));
//         dispatch(setAddFolderData({
//             folderId: id,
//             add: false
//         }));
//     };

//     return (
//         <div className="p-1 custom-scroll rounded-lg">
//             {allFolders?.saved_topics?.map((folder) => (
//                 <Content
//                     key={folder.id}
//                     folder={folder}
//                     openFolders={openFolders}
//                     toggleFolder={toggleFolder}
//                     addArticlesHandler={addArticlesHandler}
//                     level={0} // Root level
//                     activeContextMenu={activeContextMenu}
//                     setActiveContextMenu={setActiveContextMenu}
//                     contextMenuPosition={contextMenuPosition}
//                     setContextMenuPosition={setContextMenuPosition}
//                 />
//             ))}
//         </div>
//     );
// };

// export default ContentTree;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddFolderData, setFolderName } from "../../../../redux/slice/sidebarSlice";
import Content from "./Content";

const getFolderPath = (targetId, folders, level = 0, path = {}) => {
    for (let folder of folders) {
        // Build a new path including the current folder at this level.
        const newPath = { ...path, [level]: { id: folder.id, name: folder.name } };

        // If this folder is the target, return the complete path.
        if (folder.id === targetId) {
            return newPath;
        }

        // Otherwise, if the folder has subfolders, search recursively.
        if (folder.subfolders && folder.subfolders.length > 0) {
            const result = getFolderPath(targetId, folder.subfolders, level + 1, newPath);
            if (result) return result;
        }
    }
    return null;
};

const ContentTree = ({ allFolders, addArticlesHandler }) => {
    const [openFolders, setOpenFolders] = useState({}); // Store open folders per level
    const [activeContextMenu, setActiveContextMenu] = useState(null); // Track active context menu folder
    const [contextMenuPosition, setContextMenuPosition] = useState(null); // Track menu position
    const dispatch = useDispatch();

    const SelectedFolderName = Object.values(openFolders)
        .map((folder) => folder?.name)
        .join('/');
    const selectedFolderState = useSelector((state) => state.sidebar.addFolder);
    const selectedFolderId = selectedFolderState ? selectedFolderState.folderId : null;
    
    const folderName = useSelector((state) => state.sidebar.folderName);
    
    useEffect(() => {
        if (selectedFolderId && allFolders && allFolders.saved_topics) {
            const folderPath = getFolderPath(selectedFolderId, allFolders.saved_topics);
            if (folderPath) {
                setOpenFolders(folderPath);
            }
        }
    }, [selectedFolderId, allFolders]);
    
    useEffect(() => {
        dispatch(setFolderName(SelectedFolderName));
    }, [SelectedFolderName, dispatch]);

    // Corrected toggleFolder function:
    // Now accepts the entire folder object so we can store both id and name,
    // and clears any open nested folders when closing a folder.
    const toggleFolder = (folder, level) => {
        setOpenFolders((prev) => {
            const newOpenFolders = { ...prev };
            // If the folder is already open at this level, close it (and clear deeper levels)
            if (newOpenFolders[level] && newOpenFolders[level].id === folder.id) {
                Object.keys(newOpenFolders).forEach((key) => {
                    if (Number(key) >= level) {
                        delete newOpenFolders[key];
                    }
                });
            } else {
                // Open the folder at the current level
                newOpenFolders[level] = { id: folder.id, name: folder.name };
                // Clear any nested open folders beyond the current level
                Object.keys(newOpenFolders).forEach((key) => {
                    if (Number(key) > level) {
                        delete newOpenFolders[key];
                    }
                });
            }
            return newOpenFolders;
        });
        dispatch(setAddFolderData({
            folderId: folder.id,
            add: false
        }));
    };

    return (
        <div className="p-1 custom-scroll rounded-lg">
            {allFolders?.saved_topics?.map((folder) => (
                <Content
                    key={folder.id}
                    folder={folder}
                    openFolders={openFolders}
                    toggleFolder={toggleFolder}
                    addArticlesHandler={addArticlesHandler}
                    level={0} // Root level
                    activeContextMenu={activeContextMenu}
                    setActiveContextMenu={setActiveContextMenu}
                    contextMenuPosition={contextMenuPosition}
                    setContextMenuPosition={setContextMenuPosition}
                />
            ))}
        </div>
    );
};

export default ContentTree;
