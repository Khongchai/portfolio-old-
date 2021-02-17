"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsResolver = void 0;
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const type_graphql_1 = require("type-graphql");
const ProjectEntity_1 = require("../entities/ProjectEntity");
const typeorm_1 = require("typeorm");
const getTechnologiesByTitle_1 = __importDefault(require("../utils/getTechnologiesByTitle"));
let ProjectCreationInput = class ProjectCreationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "startDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "endDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectCreationInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProjectCreationInput.prototype, "frontEndNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProjectCreationInput.prototype, "backEndNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProjectCreationInput.prototype, "languagesNames", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ProjectCreationInput.prototype, "hostingServiceNames", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ProjectCreationInput.prototype, "isHighlight", void 0);
ProjectCreationInput = __decorate([
    type_graphql_1.InputType()
], ProjectCreationInput);
let AddTechInput = class AddTechInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddTechInput.prototype, "projName", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], AddTechInput.prototype, "technologiesNames", void 0);
AddTechInput = __decorate([
    type_graphql_1.InputType()
], AddTechInput);
let ErrorField = class ErrorField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    type_graphql_1.ObjectType()
], ErrorField);
let ProjResponse = class ProjResponse {
};
__decorate([
    type_graphql_1.Field(() => [ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], ProjResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => ProjectEntity_1.ProjectEntity, { nullable: true }),
    __metadata("design:type", ProjectEntity_1.ProjectEntity)
], ProjResponse.prototype, "proj", void 0);
ProjResponse = __decorate([
    type_graphql_1.ObjectType()
], ProjResponse);
let ProjectsResolver = class ProjectsResolver {
    projects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProjectEntity_1.ProjectEntity.find({
                relations: [
                    "frontEndTechnologies",
                    "backEndTechnologies",
                    "languages",
                    "hostingServices",
                ],
            });
        });
    }
    createProject(projectData, {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, endDate, startDate, title, frontEndNames, backEndNames, languagesNames, hostingServiceNames, isHighlight, } = projectData;
            const frontEnd = yield getTechnologiesByTitle_1.default(frontEndNames);
            const backEnd = yield getTechnologiesByTitle_1.default(backEndNames);
            const languages = yield getTechnologiesByTitle_1.default(languagesNames);
            const hostingServices = yield getTechnologiesByTitle_1.default(hostingServiceNames);
            console.log(frontEnd, backEnd, languages, hostingServices);
            const newProj = yield ProjectEntity_1.ProjectEntity.create({
                description,
                endDate,
                title,
                startDate,
                frontEndTechnologies: frontEnd,
                backEndTechnologies: backEnd,
                hostingServices: hostingServices,
                languages,
                isHighlight: isHighlight || false,
            }).save();
            return newProj;
        });
    }
    addTechnologies(input) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { projName, technologiesNames } = input;
            const proj = yield ProjectEntity_1.ProjectEntity.findOne({
                where: { title: projName },
                relations: ["technologiesUsed"],
            });
            if (!proj) {
                return {
                    errors: [
                        {
                            message: "No projects found",
                        },
                    ],
                };
            }
            const technologies = yield typeorm_1.getManager()
                .createQueryBuilder(TechnologyEntity_1.TechnologyEntity, "tech")
                .where("tech.title IN (:...titles)", { titles: technologiesNames })
                .orderBy("tech.title")
                .getMany();
            const length = technologiesNames.length;
            for (let i = 0; i < length; i++) {
                if (!technologiesNames.includes((_a = technologies[i]) === null || _a === void 0 ? void 0 : _a.title)) {
                    return {
                        errors: [
                            {
                                message: `Technology ${technologiesNames[i]} does not exist`,
                            },
                        ],
                    };
                }
            }
            proj.technologiesUsed = [...proj.technologiesUsed, ...technologies];
            yield proj.save();
            return { proj };
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectToBeDeleted = yield ProjectEntity_1.ProjectEntity.findOne({ id });
            if (!projectToBeDeleted) {
                return false;
            }
            else {
                yield projectToBeDeleted.remove();
                return true;
            }
        });
    }
    deleteAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectsToBeDeleted = yield ProjectEntity_1.ProjectEntity.find({});
            if (projectsToBeDeleted.length === 0) {
                return "No more projects left to delete.";
            }
            else {
                yield ProjectEntity_1.ProjectEntity.remove(projectsToBeDeleted);
                return "All projects deleted successfully.";
            }
        });
    }
    addRandomTechToAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProjects = yield ProjectEntity_1.ProjectEntity.find({
                relations: ["technologiesUsed"],
            });
            const allTechnologies = yield TechnologyEntity_1.TechnologyEntity.find({});
            const length = allProjects.length;
            for (let i = 0; i < length; i++) {
                const ranNum = Math.floor(Math.random() * allTechnologies.length);
                allProjects[i].technologiesUsed = [
                    ...allProjects[i].technologiesUsed,
                    allTechnologies[ranNum],
                ];
                yield allProjects[i].save();
            }
            return allProjects;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [ProjectEntity_1.ProjectEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "projects", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectEntity_1.ProjectEntity, { nullable: true }),
    __param(0, type_graphql_1.Arg("projectData")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectCreationInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => ProjResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("projectData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddTechInput]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "addTechnologies", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteProject", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteAllProjects", null);
__decorate([
    type_graphql_1.Mutation(() => [ProjectEntity_1.ProjectEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "addRandomTechToAllProjects", null);
ProjectsResolver = __decorate([
    type_graphql_1.Resolver()
], ProjectsResolver);
exports.ProjectsResolver = ProjectsResolver;
//# sourceMappingURL=ProjectResolver.js.map