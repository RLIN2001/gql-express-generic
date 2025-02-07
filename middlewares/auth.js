const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");

const authMiddleware = (schema) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDirective = getDirective(schema, fieldConfig, "auth");

			if (authDirective) {
				const { resolve = defaultFieldResolver } = fieldConfig;

				fieldConfig.resolve = async function (source, args, context, info) {
					if (!context.req.session || !context.req.session.user) {
						throw new Error(
							"Unauthorized: You must be logged in to perform this action"
						);
					}
					return resolve(source, args, context, info);
				};
			}

			return fieldConfig;
		},
	});
};

module.exports = authMiddleware;
