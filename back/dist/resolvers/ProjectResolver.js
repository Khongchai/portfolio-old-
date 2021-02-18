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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsResolver = void 0;
const TechnologyEntity_1 = require("../entities/TechnologyEntity");
const type_graphql_1 = require("type-graphql");
const ProjectEntity_1 = require("../entities/ProjectEntity");
const getTechnologiesByTitle_1 = require("../utils/getTechnologiesByTitle");
const ProjectResolver_1 = require("../inputAndObjectTypes/ProjectResolver");
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
            const { description, endDate, startDate, title, isHighlight } = projectData;
            const { frontEndNames, backEndNames, languagesNames, hostingServiceNames, } = projectData.techProps;
            const { backEnd, frontEnd, languages, hostingServices, } = yield getTechnologiesByTitle_1.getTechListForEachProp(frontEndNames, backEndNames, languagesNames, hostingServiceNames);
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
        return __awaiter(this, void 0, void 0, function* () {
            const { projName } = input;
            const { backEndNames, frontEndNames, hostingServiceNames, languagesNames, } = input.techProps;
            const proj = yield ProjectEntity_1.ProjectEntity.findOne({
                where: { title: projName },
                relations: [
                    "frontEndTechnologies",
                    "backEndTechnologies",
                    "languages",
                    "hostingServices",
                ],
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
            const { backEnd, frontEnd, languages, hostingServices, error, } = yield getTechnologiesByTitle_1.getTechListForEachProp(frontEndNames, backEndNames, languagesNames, hostingServiceNames);
            if (error)
                return {
                    errors: [
                        {
                            message: error,
                        },
                    ],
                };
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
    __metadata("design:paramtypes", [ProjectResolver_1.ProjectCreationInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectResolver_1.ProjResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("projectData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectResolver_1.AddTechInput]),
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