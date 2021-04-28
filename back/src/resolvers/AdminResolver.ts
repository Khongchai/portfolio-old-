import { AdminEntity } from "../entities/AdminEntity";
import {
  AdminDeletionResponse,
  AdminResponse,
  EmailPasswordInput,
} from "../inputAndObjectTypes/AdminResolver";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Context } from "../types";
import argon2 from "argon2";
import { validateAdminEmailAndPassword } from "../utils/validateAdminEmailAndPassword";
import { destroySession } from "../utils/destroySession";

@Resolver()
export class AdminResolver {
  /**
   * Allows only 1 instance of Admin
   *
   */
  @Mutation(() => AdminResponse)
  async createAdmin(
    @Arg("input") input: EmailPasswordInput
  ): Promise<AdminResponse> {
    const adminCheck = await AdminEntity.find({});
    if (adminCheck.length > 0) {
      return { error: "Only one instance of admin is allowed" };
    }

    const { email, password } = input;

    if (!email.includes("@")) {
      return { error: "Invalid email; should contain @" };
    }
    const hashedPassword = await argon2.hash(password);
    const admin = await AdminEntity.create({
      email,
      password: hashedPassword,
    }).save();
    return { admin };
  }

  //Only the admin can delete itself
  @Mutation(() => AdminDeletionResponse)
  async deleteAdmin(
    @Arg("input") input: EmailPasswordInput,
    @Ctx() { req, res }: Context
  ): Promise<AdminDeletionResponse> {
    const { error, admin } = await validateAdminEmailAndPassword(input);
    if (error || !admin) return { error };

    await AdminEntity.remove(admin);
    destroySession({ req, res });

    return { message: "Deletion successful" };
  }

  @Mutation(() => AdminResponse)
  async login(
    @Arg("input") input: EmailPasswordInput,
    @Ctx() { req }: Context
  ): Promise<AdminResponse> {
    const { error, admin } = await validateAdminEmailAndPassword(input);

    if (error || !admin) return { error: error as string };

    req.session.adminId = admin.id;

    return { admin };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context) {
    return destroySession({ req, res });
  }

  @Query(() => [AdminEntity])
  async showAdmins(): Promise<AdminEntity[]> {
    const admins = await AdminEntity.find({});
    return admins;
  }
}
