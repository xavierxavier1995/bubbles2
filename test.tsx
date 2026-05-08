const { useState, useEffect, useRef, useCallback, useMemo } = React;
const { motion, AnimatePresence, useScroll, useTransform, useInView } = window.Motion;

// Lucide Icon Mock
const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 2, className = "", ...props }) => {
    return <div />;
};
