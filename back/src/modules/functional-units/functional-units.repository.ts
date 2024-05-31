import { Injectable } from '@nestjs/common';
import { FunctionalUnit } from './entities/functional-unit.entity';
import { FUNCTIONAL_UNIT_TYPE } from 'src/utils/constants';
import { CreateFunctionalUnitDto } from './dto/create-functional-unit.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateFunctionalUnitDto } from './dto/update-functional-unit.dto';

@Injectable()
export class FunctionalUnitsRepository {
  
  
  
  private functionalUnits: FunctionalUnit[] = [
    {
      id: 'b1f634d8-abb4-4b70-8b26-1d5dff36c1f4',
      type: FUNCTIONAL_UNIT_TYPE.APARTMENT,
      location: '1st Floor, Building A, Complex XYZ',
      number: 'A-101',
      owner: 'Alice Smith',
      owner_phone_number: '1234567890',
      owner_email: 'alice.smith@example.com',
      balance: 0,
    },
    {
      id: 'e0a3b49b-2a67-4b5d-9fd4-7f3a8aef8a72',
      type: FUNCTIONAL_UNIT_TYPE.GARAGE,
      location: 'Basement 1, Building B, Complex XYZ',
      number: 'B-201',
      owner: 'Bob Johnson',
      owner_phone_number: '2345678901',
      owner_email: 'bob.johnson@example.com',
      balance: -15000,
    },
    {
      id: '3a97c92a-5f4a-4a6d-8df4-67a8a4eabe77',
      type: FUNCTIONAL_UNIT_TYPE.COMMERCIAL_SPACE,
      location: 'Ground Floor, Building C, Complex XYZ',
      number: 'C-301',
      owner: 'Carol Williams',
      owner_phone_number: '3456789012',
      owner_email: 'carol.williams@example.com',
      balance: -10000,
    },
    {
      id: '7cb1fdbb-9876-44eb-9ff6-4b4c22a0a9b0',
      type: FUNCTIONAL_UNIT_TYPE.OFFICE,
      location: '3rd Floor, Building D, Complex XYZ',
      number: 'D-401',
      owner: 'David Brown',
      owner_phone_number: '4567890123',
      owner_email: 'david.brown@example.com',
      balance: 20000,
    },
    {
      id: 'cbd33d76-4b6e-4df1-88ff-b7c4a4d57b8d',
      type: FUNCTIONAL_UNIT_TYPE.OTHER,
      location: 'Block 5, Street 10, Complex XYZ',
      number: 'H-501',
      owner: 'Eva Davis',
      owner_phone_number: '5678901234',
      owner_email: 'eva.davis@example.com',
      balance: 0,
    },
  ];

  async findAll(): Promise<FunctionalUnit[]> {
    return await this.functionalUnits;
  }

  async findOne(id: string): Promise<FunctionalUnit | undefined> {
    return await this.functionalUnits.find((functionalUnit) => functionalUnit.id === id);
  }

  async findByConsortium(consortiumId: string): Promise <FunctionalUnit[]> {
    throw new Error('Method not implemented.');
  }
  async create(createFunctionalUnitDto: CreateFunctionalUnitDto): Promise<FunctionalUnit> {
    const functionalUnit: FunctionalUnit = {
        ...createFunctionalUnitDto,
        id: uuidv4(),
    }
    this.functionalUnits.push(functionalUnit);
    return functionalUnit;
  }

  async update(id: string, updateFunctionalUnitDto: UpdateFunctionalUnitDto): Promise<FunctionalUnit> {
    throw new Error('Method not implemented.');
  }
}
