import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as efs from 'aws-cdk-lib/aws-efs';

export class EfsStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //find my exisiting vpc
    const vpc = ec2.Vpc.fromLookup(this, 'ImportVPC', {vpcId: 'vpc-0b3e718e0d3a7b733'});
  
    
    //create efs within the vpc
    const efsSecurityGroup = new ec2.SecurityGroup(this, 'efs-sg',{
      vpc,
      allowAllOutbound: true,
      description: 'security group for efs'
    });
    
    const fileSytem = new efs.FileSystem(this, "MyEfsFileSystem",{
      vpc,
      encrypted: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      securityGroup: efsSecurityGroup,
    });
    
    //create a volumn
    const volume = { name: "volumn",
      efsVolumnConfiguration: {
        fileSystemId: fileSytem.fileSystemId
      }
  };
  }
}
