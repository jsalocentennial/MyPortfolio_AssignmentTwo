const requireOwnerOrAdmin = (req, res, next) => {
    if (req.user?.role === 'admin' || req.user?.id === req.params.id) {
        return next();
    } 
    return res.status(403).json({ message: 'Access denied. You must be the owner or an admin to perform this action.' });
};

export default requireOwnerOrAdmin;