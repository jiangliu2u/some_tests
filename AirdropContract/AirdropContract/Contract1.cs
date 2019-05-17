using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;
using Neo.SmartContract.Framework.Services.System;
using System;
using System.ComponentModel;
using System.Numerics;

namespace AirdropContract
{
	public class AirdropContract : SmartContract
	{
		public static readonly byte[] SuperAdmin = "AGCZsNnK1XQCKLueMsrhJtB8xXDk53y7YB".ToScriptHash();
		
		private const string TX = "txInfo";
		[Appcall("f0c1f15cb3b7ec9466e63aff988aab4083e80dd1")]
		static extern object CallCake(string method, object[] arr);



		[DisplayName("deposited")]
		public static event Action<byte[], BigInteger> Deposited;

		[DisplayName("withdrew")]
		public static event Action<byte[], BigInteger> Withdrew;

		/// <summary>
		///   This smart contract is designed to airdrop and withdraw according to time.
		///   Parameter List: 0710
		///   Return List: 05
		/// </summary>
		/// <param name="operation">
		///   The method being invoked.
		/// </param>
		/// <param name="args">
		///   Optional input parameters. 
		/// </param>
		public static Object Main(string operation, params object[] args)
		{
			if (Runtime.Trigger == TriggerType.Verification)
			{
				if (Runtime.CheckWitness(SuperAdmin)) return true;

				Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;
				var type = tx.Type;

				//Blockchain.GetAsset("".ToScriptHash())
				var invocationTransaction = (InvocationTransaction)tx;
				if (invocationTransaction.Script.Length != 61)
				{
					return false;
				}

				return true;
			}

			if (Runtime.Trigger == TriggerType.Application)
			{
				if (operation == "deposit")
				{
					return Deposit(args);
				}
				if (operation == "withdraw")
				{
					return Withdraw(args);
				}
			}
			
			return false;
		}

		/// <summary>
		///   Deposit the amount to the account.
		/// </summary>
		/// <param name="args">
		///   The contract input parameters: account, depositAmount, phase.
		/// </param>
		/// <returns>
		///   Deposit Successful?
		/// </returns>
		public static bool Deposit(object[] args)
		{
			if (!Runtime.CheckWitness(SuperAdmin)) return false;

			if (args.Length != 2) throw new Exception();

			byte[] account = (byte[])args[0];
			if (account.Length != 20) throw new Exception();
			BigInteger depositAmount = (BigInteger)args[1];
			BigInteger originAmount = 0;
			Storage.Put(Storage.CurrentContext, account, depositAmount);
			Deposited(account, depositAmount);
			return true;
		}

		/// <summary>
		///   Withdraw the available amount to the account.
		/// </summary>
		/// <param name="args">
		///   The contract input parameters: account.
		/// </param>
		/// <returns>
		///   Withdraw Successful?
		/// </returns>
		public static bool Withdraw(object[] args)
		{
			if (args.Length != 1) throw new Exception();
			byte[] withdrawParameter = (byte[])args[0];
			if (withdrawParameter.Length != 28) throw new Exception();
			byte[] account = withdrawParameter.Range(8, 20);

			

			
			int withdrawAmount = 10;
			if (withdrawAmount < 1) throw new Exception();

			byte[] from = Neo.SmartContract.Framework.Services.System.ExecutionEngine.ExecutingScriptHash;
			// call lrn transfer
			byte[] rt = (byte[])CallCake("transfer", new object[] { from, account, withdrawAmount });
			bool succ = rt.AsBigInteger() == 1;
			if (succ)
			{
				BigInteger now = Blockchain.GetHeader(Blockchain.GetHeight()).Timestamp;
				BigInteger withdrawNo = 1;
				Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;
				Storage.Put(Storage.CurrentContext, account.Concat(TX.AsByteArray()).Concat(withdrawNo.AsByteArray()), tx.Hash);
				Withdrew(account, withdrawAmount);
			}
			else
			{
				return false;
			}
			return true;
		}
	}
}
