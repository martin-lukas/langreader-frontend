import React from "react";
import classNames from "classnames";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    onEdit?: () => void;
    onDelete?: () => void;
    cssClasses?: string;
}

const ListItem: React.FC<ListItemProps> = ({children, onEdit, onDelete, cssClasses, ...props}) => {
    return (
        <div className={classNames("list-item", cssClasses)} {...props}>
            {children}
            
            {onEdit &&
            <button
                className={classNames("list-item-edit-btn", {"list-item-last": !onDelete})}
                onClick={onEdit}
            >
                <i className="far fa-edit"/>
            </button>
            }
            
            {onDelete &&
            <button
                className={classNames("list-item-del-btn", "list-item-last")}
                onClick={onDelete}
            >
                <i className="fas fa-ban"/>
            </button>
            }
        </div>
    );
};

export default ListItem;