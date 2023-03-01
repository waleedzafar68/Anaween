const paginatedResults = (model) => {
    return async (req, res, next) => {
        console.log(req.query)
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 500;
        // const limit = 5;
        // const name = req.query.search;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        const searchParams = req.query.params && JSON.parse(req.query.params);
        searchParams?.map((x, i) => {
            console.log(x[Object.keys(x)[0]], Object.keys(x)[0])
        })
        // const keys = Object.keys(searchParams);
        // const values = Object.values(searchParams);

        // const keysfromParam = searchParams.map((searchParams, key) => searchParams[key] = keys);
        // console.log(keysfromParam)
        // console.log(searchParams.map((x, i) => (
        //     { [Object.keys(x)[0]]: { $regex: '.*' + x[Object.keys(x)[0]] + '.*' } }
        // )))
        try {
            results.results = await model.find({
                ...(searchParams) && {
                    "$or": searchParams.map((x, i) => (
                        { [Object.keys(x)[0]]: { $regex: '.*' + x[Object.keys(x)[0]] + '.*', $options: 'i' } }
                    ))
                }
            }).sort({ _id: -1 }).limit(limit).skip(startIndex).exec();

            results.count = await model.count()

            console.log(results)
            res.paginatedResults = results;
            next();
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = paginatedResults
// export default paginatedResults;