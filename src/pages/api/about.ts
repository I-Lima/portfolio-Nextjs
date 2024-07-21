import aboutDAO from "@/daos/aboutDAO";
import responseBuilder from "@/utils/responseBuilder";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      await aboutDAO
        .getAllAboutData()
        .then((success) => {
          return responseBuilder(
            { status: 200, success: true, data: success[0] },
            res,
          );
        })
        .catch((error) => {
          return responseBuilder(
            {
              status: 500,
              success: false,
              error: "Error fetching about data",
              message: error,
            },
            res,
          );
        });
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      return responseBuilder(
        {
          status: 400,
          success: false,
          error: "Invalid request.",
          message: `The ${req.method} method is not accepted.`,
        },
        res,
      );
  }
}
