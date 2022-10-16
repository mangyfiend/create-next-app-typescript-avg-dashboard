import Link from "next/link";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./source";
import styles from "./Datatable.module.scss";

const Datatable = () => {
	const [data, setData] = useState(userRows);

	//
	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

   // 
	const userActionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className={styles.cellAction}>
						<Link href="/users/test" style={{ textDecoration: "none" }}>
							<div className={styles.viewButton}>View</div>
						</Link>
						<div className={styles.deleteButton} onClick={() => handleDelete(params.row.id)}>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	return (
		<div className={styles.datatable}>
			<div className={styles.datatableTitle}>
				Add New User
				<Link href="/users/new" className={styles.link}>
					Add New
				</Link>
			</div>
			<DataGrid
				className="datagrid"
				rows={data}
				columns={userColumns.concat(userActionColumn)}
				pageSize={5}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	);
};

export default Datatable;
