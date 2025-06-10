import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import EstacionesList from "../../components/Station/EstacionesList";
const Home = () => {

	useEffect(() => {

	}, []);
	return (
		<div>
			<Banner />
			<EstacionesList />
		</div>
	);
};

export default Home;
