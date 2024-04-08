/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const ContextProvider = ({ children }) => {
  return (
    <Router>
      <ScrollToTop /> {children}
    </Router>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
