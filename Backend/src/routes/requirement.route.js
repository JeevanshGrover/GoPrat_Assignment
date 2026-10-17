import { Router } from "express";
import {
    createRequirement,
    getRequirementById,
    getRequirements
} from "../controller/requirements.controller.js"

const router = Router();

router.route("/").post(createRequirement).get(getRequirements);
router.route("/:id").get(getRequirementById);

export default router;