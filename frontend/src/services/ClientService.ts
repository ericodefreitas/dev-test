import { BaseService } from "./BaseService";
import { Client } from "@/types/api/Client";

class ClientService extends BaseService {
  constructor() {
    super("client");
  }

  async getAll(): Promise<Client[]> {
    return await this.get<Client[]>("");
  }

  async create(client: Client): Promise<string> {
    return await this.post<Client, string>("", client);
  }

  async getById(id: string): Promise<Client> {
    return await this.get<Client>(id);
  }

  async getByDocumentNumber(documentNumber: string): Promise<Client> {
    return await this.get<Client>(`clients?document=${encodeURIComponent(documentNumber)}`);
  }

  async update(client: Client): Promise<string> {
    return await this.put<Client, string>("", client);
  }
}

export default new ClientService();