import { IColumn } from "../interfaces/IColumn";



export default class Column implements IColumn {
    column_id: number;
    column_name: string;
    column_label: string;
    column_seq: number;
    column_order: number;
    column_desc: string;
    epic_path: string;
    logic: string;
    column_hasDesc: string;
    isSelected: boolean;
    isSearched: boolean;
    constructor(column?: Column) {
        if (column) {
            this.column_id = column.column_id;
            this.column_name = column.column_name;
            this.column_label = column.column_label;
            this.column_seq = column.column_seq;
            this.column_order = column.column_order;
            this.column_desc = column.column_desc;
            this.epic_path = column.epic_path;
            this.logic = column.logic;
            this.column_hasDesc = column.column_hasDesc;
            this.isSelected = false;
            this.isSearched = false;
        }
    }
}